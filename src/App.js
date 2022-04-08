import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './components/Routes';
import {getUser} from './action/user.action';
import { UIdContext } from './components/App.context';
import { io } from 'socket.io-client';

import './style/index.scss';
import { getNotifications } from './action/notification.action';
import { isEmpty } from './components/Utils';
import { useCookies } from 'react-cookie';

function App() {

  const [UId, setUId] = useState(null);
  const disptach = useDispatch();

  const [socket, setSocket] = useState();

 const userData = useSelector(state => state.userReducer);

  useEffect(() => {
    const fetchToken = async() => {
        await axios({
          method: 'get',
          withCredentials: true,
          url: `${process.env.REACT_APP_API_URL}/jwtid`
        }).then((res) => {
          setUId(res.data);
        }).catch((err) => {
          console.log(err);
        })
    }
    fetchToken();

    if (UId) {
      disptach(getUser(UId));
      disptach(getNotifications()); 
    } 
  }, [UId, disptach]);

  useEffect(() => {
    const s = io(`${process.env.REACT_APP_API_URL}`);
    setSocket(s);

    return () => {
        s.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(socket) && (!isEmpty(userData))) {
        socket.emit('new-global-user', userData);
    }
    return 
  }, [socket, userData])

  const [cookies] = useCookies(['theme', {path: "/"}]);


  return (
    <div className={cookies.theme === "day" ? 'app light' : 'app dark'}>
      <UIdContext.Provider value={UId}>
        <Routes />
      </UIdContext.Provider>
    </div>
  );
}

export default App;
