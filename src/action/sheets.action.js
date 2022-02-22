import axios from "axios";

export const GET_SHEETS = "GET_SHEETS";
export const TEAM_MEMBER_UPDATE = "TEAM_MEMBER_UPDATE";

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

export const teamMemberAdded = (userId, sheetId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheetId}/team/add`,
            withCredentials: true,
            data: {
                team_user_id: userId
            }
        }).then((res) => {
            dispatch({type: TEAM_MEMBER_UPDATE, payload: res.data})
        })
    }
}

export const teamMemberRemove = (userId, sheetId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/api/sheet/${sheetId}/team/remove`,
            withCredentials: true,
            data: {
                team_user_id: userId
            }
        }).then((res) => {
            dispatch({type: TEAM_MEMBER_UPDATE, payload: res.data})
        })
    }
}