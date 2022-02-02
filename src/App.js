import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './components/Routes';
import {getUser} from './action/user.action';
import { UIdContext } from './components/App.context';

import './style/index.scss';
import { getNotifications } from './action/notification.action';


function App() {

  const [UId, setUId] = useState(null);
  const disptach = useDispatch();

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


  return (
    <UIdContext.Provider value={UId}>
      <Routes />
    </UIdContext.Provider>
  );
}

export default App;
