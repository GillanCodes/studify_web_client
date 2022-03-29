import { GET_ANSWERS } from "../action/quizz.action";

const initialState = {};

export default function quizzAnswersReducer(state = initialState, action) {

    switch(action.type) {
        case GET_ANSWERS:
            return action.payload;
        default:
            return state;
    }
}