import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { getNotifications } from '../../action/notification.action';

export default function NotificationBox({notification}) {

    const dispatch = useDispatch();

    const markRealdHandle = () => {
        axios({
            method: "PUT",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/notification/read/${notification._id}`
        }).then(() => {
            dispatch(getNotifications());
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteHandle = () => {
        axios({
            method: "DELETE",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/notification/delete/${notification._id}`
        }).then(() => {
            dispatch(getNotifications());
        }).catch((err) => {
            console.log(err)
        })
    }


  return (
    <div className={`notification-box ${notification.readed ? "" : "unread"}`} key={notification._id}>
        <img src={notification.image} alt="Noti" className='notification-image' />
        <p className="notification-content">{notification.content}</p>
        <div className="controls">
            {!notification.readed && ( <span data-tip="Marquer comme lu" onClick={markRealdHandle}><i className="fas fa-eye-slash unread"></i></span> )}
            <span onClick={deleteHandle}><i data-tip="Supprimer" className="far fa-times-circle delete"></i></span>    
            <ReactTooltip effect='solid' place='top' />
        </div>
    </div>
  );
}
