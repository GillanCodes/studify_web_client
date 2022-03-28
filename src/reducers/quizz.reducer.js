import { ADD_QUESTION, EDIT_QUESTION, GET_QUIZZ, REMOVE_QUESTION } from "../action/quizz.action";
const initialState = {};

export default function quizzReducer(state = initialState, action) {

    switch(action.type) {
        case GET_QUIZZ:
            return action.payload;
        case ADD_QUESTION: 
            return state.map((quizz) => {
                if (quizz._id === action.payload._id) {
                    return {
                        ...quizz,
                        questions: action.payload.questions
                    }
                }
                return quizz
            });
        case REMOVE_QUESTION: 
            return state.map((quizz) => {
                if (quizz._id === action.payload._id) {
                    return {
                        ...quizz,
                        questions: action.payload.questions
                    }
                }
                return quizz
            });
        case EDIT_QUESTION:
            return state.map((quizz) => {
                if (quizz._id === action.payload._id) {
                    return {
                        ...quizz,
                        questions: action.payload.questions
                    }
                }
                return quizz
            });
        default:
            return state;
    }

}