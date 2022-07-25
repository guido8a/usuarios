//Es la combinación de todos los reducers
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calReducer } from "./calReducer";
import { menuReducer } from "./menuReducer";
import { uiReducer } from "./uiReducer";
import { moduloReducer } from "./moduloReducer";
import { perfilesReducer } from "./perfilesReducer";
import { fincasReducer } from "./fincasReducer";
import { geoReducer } from "./geoReducer";
import { orgReducer } from "./orgReducer";
import { insReducer } from "./insReducer";


export const rootReducer = combineReducers ({
    ui: uiReducer,
    cal: calReducer,
    auth: authReducer,
    menu: menuReducer,
    mdlo: moduloReducer,
    perfiles: perfilesReducer,
    fincas: fincasReducer,
    geografia: geoReducer,
    organizacion: orgReducer,
    institucion: insReducer,
})