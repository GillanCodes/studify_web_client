import axios from "axios";

export const GET_SHEETS = "GET_SHEETS";

export const getSheets = () => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/sheet/`
        }).then((res) => {
            dispatch({type: GET_SHEETS, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}