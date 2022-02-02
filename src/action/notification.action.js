import axios from "axios";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";

export const getNotifications = () => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/notification/`
        }).then((res) => {
            dispatch({type: GET_NOTIFICATIONS, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}