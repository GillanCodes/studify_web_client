import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import { isEmpty } from '../Utils';


export default function Editor({ sheet }) {

    const quillRef = useRef()

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

    const [text, setText] = useState(sheet.sheet_body);
    const [oldText, setOldText] = useState(sheet.sheet_body);

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
        console.log(content);
        setText(content)
        socket.emit("send-changes", content);
        
    }

    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.emit('get-document', sheet._id);
        }
        return 
    }, [socket, sheet])

    useEffect(() => {
        if(socket !== undefined) {
            console.log(socket)
            socket.on('receive-changes', content => {
                quillRef.current.setEditorContents(quillRef.current.getEditor(), content)
            });
        }
        // socket.on('recieve-changes', content => {
        //     console.log(content);
        // })s
    }, [socket])
    
    useEffect(() => {
        console.log(oldText === text)

        if (oldText === text){
            return null
        } else {
            var interval = setInterval(() => {
                
                axios({
                    method: 'put',
                    withCredentials: true,
                    url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheet._id}`,
                    data: {
                        sheet_body: text
                    }
                }).then(() => {
                    setOldText(text);
                })
            }, 2000);
        
            return () => {
                clearInterval(interval)
            };
        } 
    }, [text, oldText, sheet]);

  return (
      <div>
            <ReactQuill modules={TOOLBAR_OPTIONS} onChange={changeHandle} ref={quillRef} defaultValue={sheet.sheet_body} />
      </div>
  );
}
