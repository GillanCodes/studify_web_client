import { combineReducers } from "redux";
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import sheetsReducer from './sheets.reducer';
import notificationReducer from './notification.reducer';
import quizzReducer from './quizz.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    sheetsReducer,
    notificationReducer,
    quizzReducer
})