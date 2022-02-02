import { combineReducers } from "redux";
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import sheetsReducer from './sheets.reducer';
import notificationReducer from './notification.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    sheetsReducer,
    notificationReducer,
})