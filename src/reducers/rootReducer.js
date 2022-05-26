//Es la combinación de todos los reducers
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calReducer } from "./calReducer";
import { tablaReducer } from "./tablaReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers ({
    ui: uiReducer,
    cal: calReducer,
    auth: authReducer,
    tabla: tablaReducer
})