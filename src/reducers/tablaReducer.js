import { tipos } from "../tipos/tipos";

const estadoInicial = {
    usuarios: [],
}

export const tablaReducer = (state = estadoInicial, accion) =>{
    switch (accion.type) {        
        case tipos.uiTablaUsuarios:            
            return{
                ...state,
                usuarios: [...accion.payload]
            }               
        default:
            return state;
    }


}