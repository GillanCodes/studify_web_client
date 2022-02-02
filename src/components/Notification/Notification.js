import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../action/notification.action';
import NotificationBox from './NotificationBox';

export default function Notification() {

    const dispatch = useDispatch();

    const [opened, setOpened] = useState(false);
    const [unread, setUnread] = useState(0);

    const notificationsData = useSelector(state => state.notificationReducer);

    const markAllRead = () => {
        if (unread > 0) {
            return axios({
                method: 'PUT',
                withCredentials: true,
                url: `${process.env.REACT_APP_API_URL}/api/notification/markallread`
            }).then((res) => {
                dispatch(getNotifications());
                setUnread(0);
            }).catch((err) => {
                throw Error(err);
            });
        }
    }

    // useEffect(() => {
    //   if (!isEmpty(notificationsData)) {
    //       var i=0
    //       for(i=0; i < notificationsData.length; i++) {
    //           if (notificationsData[i].readed === false) {
    //               setUnread(unread + 1);
    //           }
    //       }
    //   }
    // }, [notificationsData]);
    

  return (
      <>
        {!opened && (<i className="far fa-bell" onClick={() => setOpened(!opened)}></i>)}
		{opened && (<i className="fas fa-bell" onClick={() => setOpened(!opened)}></i>)}

        {opened && (
            <div className="dropdown-content">
                
                <div className="notification-toolbar">
                    <p>{unread} Non-Lu</p>
                    <button onClick={markAllRead}>Marquer Tout comme Lu</button>
                </div>

                {notificationsData.map((notification) => {                  
                    return (
                        <NotificationBox notification={notification} />
                    )
                })}
             
                

            </div>
        )}
      </>
  );
}
