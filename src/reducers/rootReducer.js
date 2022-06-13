//Es la combinación de todos los reducers
import { combineReducers } from "redux";
import { arbolReducer } from "./arbolReducer";
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
<<<<<<< HEAD
    mdlo: moduloReducer,
=======
    arbol: arbolReducer,
>>>>>>> f8ec2a52467d54361dad5b813ba791582ce748fd
})