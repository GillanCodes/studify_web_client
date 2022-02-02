import { GET_SHEETS } from '../action/sheets.action';

const initialState = {};

export default function sheetsReducer(state = initialState, action) {

    switch(action.type) {
        case GET_SHEETS:
            return action.payload;
        default:
            return state;
    }

}