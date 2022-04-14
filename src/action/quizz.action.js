import axios from "axios";

export const GET_QUIZZ = "GET_QUIZZ";
export const EDIT_QUIZZ = "EDIT_QUIZZ";
export const ADD_QUESTION = "ADD_QUESTION";
export const REMOVE_QUESTION = "REMOVE_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const GET_ANSWERS = "GET_ANSWERS";
export const SEND_ANSWER = "SEND_ANSWER";

export const getQuizz = () => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/`
        }).then((res) => {
            dispatch({type: GET_QUIZZ, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const editQuizz = (quizz_id, title, level, isPublic) => {
    return(dispatch) => {
        return axios({
            method:"put",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizz_id}`,
            data: {
                title,
                level,
                isPublic
            }, 
        }).then((res) => {
            dispatch({type: EDIT_QUIZZ, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const deleteQuizz = (quizz_id) => {
    return(dispatch) => {
        return axios({
            method:"delete",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizz_id}`,
        }).then((res) => {
            window.location = "/";
            dispatch({type: GET_QUIZZ, payload: res.data});  
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const addQuestion = (quizzId, question, answer) => {
    return(dispatch) => {
        return axios({
            method:"put",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizzId}/question/add`,
            data: {
                question,
                answer
            } 
        }).then((res) => {
            dispatch({type: ADD_QUESTION, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const removeQuestion = (quizzId, question_id) => {
    return(dispatch) => {
        return axios({
            method:"put",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizzId}/question/remove`,
            data: {
                question_id
            } 
        }).then((res) => {
            dispatch({type: REMOVE_QUESTION, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const editQuestion = (quizzId, question_id, question, answer) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizzId}/question/edit`,
            data: {
                question_id,
                question,
                answer
            } 
        }).then((res) => {
            dispatch({type: EDIT_QUESTION, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const getAnswers = () => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/answers/`,
        }).then((res) => {
            dispatch({type: GET_ANSWERS, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}

export const sendAnswer = (quizz_id, answers, title) => {
    return(dispatch) => {
        return axios({
            method:"post",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizz_id}/answer/`,
            data: {
                answers,
                title
            } 
        }).then((res) => {
            dispatch({type: SEND_ANSWER, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}