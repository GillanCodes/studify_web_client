import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = (Uid) => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/`
        }).then((res) => {
            dispatch({type: GET_USERS, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}