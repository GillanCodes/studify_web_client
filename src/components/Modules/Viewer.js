import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { isEmpty } from '../Utils';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

export default function Viewer({ sheet }) {

    const [socket, setSocket] = useState();
    const [currentUsers, setCurrentUsers] = useState();

    const userData = useSelector(state => state.userReducer)

    const quillRef = useRef()
    
    useEffect(() => {
        const s = io(`${process.env.REACT_APP_API_URL}`);
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!isEmpty(socket) && (!isEmpty(userData))) {
            socket.emit('new-user', userData);
        }
        return 
    }, [socket, userData])

    useEffect(() => {
        if(socket !== undefined) {
            socket.on('current-users', documentData => {
                setCurrentUsers(documentData.users);
            });
        }
    }, [socket])

    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.emit('get-document', sheet._id);
        }
        return 
    }, [socket, sheet])

    useEffect(() => {
        if(!isEmpty(socket)) {
            console.log(socket)
            socket.on('receive-changes', content => {
                quillRef.current.setEditorContents(quillRef.current.getEditor(), content)
            });
        }
    }, [socket])

  return (
      <div className='viewer'>

            {currentUsers && (
                <>
                    <div className="current-users">
                        {currentUsers.map((user) => {
                            return (
                                <a href={`../${user.username}`} className="indicator" key={user.id}><img data-tip={user.username} src={user.userPic} alt="userPics" className='indicator' /> </a>
                            )
                        })}    
                    </div>
                    <ReactTooltip effect="solid"  />
                </>
            )}
          <ReactQuill readOnly={true} defaultValue={sheet.sheet_body} ref={quillRef} />
      </div>
  );
}
