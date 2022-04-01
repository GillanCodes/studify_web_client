import axios from "axios";

export const GET_USER = "GET_USER";
export const IMAGE_UPDATED = "IMAGE_UPDATED";

export const getUser = (Uid) => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/${Uid}`
        }).then((res) => {
            dispatch({type: GET_USER, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const resetProfilImage = (uid) => {

    return(dispatch) => {
        return axios({
            method: 'POST',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/uplaod/picture/reset`,
            data: {
                userId : uid
            }
        }).then((res) => {
            dispatch({type: GET_USER, payload: res.data});
        }).catch((err) => console.log(err));

    }
}