//Es la combinación de todos los reducers
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calReducer } from "./calReducer";
import { menuReducer } from "./menuReducer";
import { uiReducer } from "./uiReducer";
import { moduloReducer } from "./moduloReducer";


export const rootReducer = combineReducers ({
    ui: uiReducer,
    cal: calReducer,
    auth: authReducer,
    menu: menuReducer,
    mdlo: moduloReducer,
})