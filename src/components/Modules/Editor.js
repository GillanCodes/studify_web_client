import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import { isEmpty } from '../Utils';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import EditorToolbar from './ToolBar/EditorToolbar';

export default function Editor({ sheet }) {

    const userData = useSelector(state => state.userReducer);

    const quillRef = useRef();

    const TOOLBAR_OPTIONS = {toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
    ]}

    const [tag_text, setTag_text] = useState(sheet.tag.text ? sheet.tag.text : "");
    const [tag_bg_color, setTag_bg_color] = useState(sheet.tag.background_color);
    const [tag_text_color, setTag_text_color] = useState(sheet.tag.text_color);
    
    
    const [title, setTitle] = useState(sheet.title);

    const [text, setText] = useState(sheet.sheet_body);
    const [oldText, setOldText] = useState(sheet.sheet_body);
    const [save, setSave] = useState(true);
    const [toolbar, setToolbar] = useState(false);

    const [currentUsers, setCurrentUsers] = useState();
    const [socket, setSocket] = useState()

    useEffect(() => {
        const s = io(`${process.env.REACT_APP_API_URL}`);
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, [])


    const changeHandle = (content, delta, source, editor) => {
        if (source !== "user") return null;
        setText(content);
        setSave(false);
        socket.emit("send-changes", content);
        
    }

    const saveTitleHandle = () => {
        axios({
            method: 'put',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheet._id}`,
            data: {
                title: title,
                tag: {
                    text: tag_text,
                    tag_bg_color: tag_bg_color,
                    tag_text_color: tag_text_color
                },
                sheet_body: text
            }
        }).then(() => {
            setSave(true);
        })
    }

    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.emit('get-document', sheet._id);
        }
        return 
    }, [socket, sheet])

    useEffect(() => {
        if (!isEmpty(socket) && (!isEmpty(userData))) {
            socket.emit('new-user', userData);
        }
        return 
    }, [socket, userData])

    useEffect(() => {
        if(socket !== undefined) {
            socket.on('current-users', documentData => {
                console.log(documentData.users);
                setCurrentUsers(documentData.users);
            });
        }
    }, [socket])

    useEffect(() => {
        if(socket !== undefined) {
            socket.on('receive-changes', content => {
                quillRef.current.setEditorContents(quillRef.current.getEditor(), content)
            });
        }
    }, [socket])
    
    useEffect(() => {
        if (oldText === text){
            setSave(true);
            return null
        } else {
            var interval = setInterval(() => {
                
                axios({
                    method: 'put',
                    withCredentials: true,
                    url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheet._id}`,
                    data: {
                        sheet_body: text,
                    }
                }).then(() => {
                    setOldText(text);
                    setSave(true);
                })
            }, 2000);
        
            return () => {
                clearInterval(interval)
            };
        } 
    }, [text, oldText, sheet]);

  return (
        <div>
            <div className="save">
                {save ? (
                    <i className="fas fa-save" data-tip="Document Sauvegarder"></i>
                ) : (
                    <i className="fas fa-sync fa-spin" data-tip="Enregistrement en Cours ..."></i>
                )}
            </div> 
            <ReactQuill modules={TOOLBAR_OPTIONS} onChange={changeHandle} ref={quillRef} defaultValue={sheet.sheet_body} />
            <ReactTooltip effect='solid' />
        </div>

      
  );
}
