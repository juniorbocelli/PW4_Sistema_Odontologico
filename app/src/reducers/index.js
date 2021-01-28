import { dialogModalReducer } from "./dialogModalReducer";
import { combineReducers } from "redux";

export const Reducers = combineReducers({
    dialogModalState: dialogModalReducer
});