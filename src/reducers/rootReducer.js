//Es la combinación de todos los reducers
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calReducer } from "./calReducer";
<<<<<<< HEAD
import { menuReducer } from "./menuReducer";
import { tablaReducer } from "./tablaReducer";
=======
>>>>>>> 516111b5ac1b913bf51788aff259d9b3dc1ee5cb
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers ({
    ui: uiReducer,
    cal: calReducer,
<<<<<<< HEAD
    auth: authReducer,
    menu: menuReducer,
    tabla: tablaReducer
=======
    auth: authReducer
>>>>>>> 516111b5ac1b913bf51788aff259d9b3dc1ee5cb
})