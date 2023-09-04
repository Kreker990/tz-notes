import { combineReducers } from "redux";
import getNotesReducer from "./getReducer";

export const rootReducer = combineReducers({
    notes: getNotesReducer,
})