import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { isEmpty } from '../Utils';

export default function Viewer({ sheet }) {

    const [socket, setSocket] = useState()

    const quillRef = useRef()
    
    useEffect(() => {
        const s = io(`${process.env.REACT_APP_API_URL}`);
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

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
      <div>
          <ReactQuill readOnly={true} defaultValue={sheet.sheet_body} ref={quillRef} />
      </div>
  );
}
