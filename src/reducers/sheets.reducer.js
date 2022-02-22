import { GET_SHEETS, TEAM_MEMBER_UPDATE } from '../action/sheets.action';

const initialState = {};

export default function sheetsReducer(state = initialState, action) {

    switch(action.type) {
        case GET_SHEETS:
            return action.payload;
        case TEAM_MEMBER_UPDATE:
            return state.map((sheet) => {
                if (sheet._id === action.payload._id) {
                    return {
                        ...sheet,
                        team: action.payload.team
                    }
                }
                return sheet
            });
        default:
            return state;
    }

}