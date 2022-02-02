import { GET_NOTIFICATIONS } from '../action/notification.action';

const initialState = {};

export default function notificationReducer(state = initialState, action) {

    switch(action.type) {
        case GET_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
}