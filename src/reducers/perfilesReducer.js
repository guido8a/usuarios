import { tipos } from "../tipos/tipos";

const estadoInicial = {
    todos: [],
    perfil: null,
    modulo: null,
    permisos: []
}

export const perfilesReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.uiRetornaPerfiles:
            return {
                ...estado,
                todos: [...accion.payload]
            }
        case tipos.uiPerfilSeleccionado:
            return {
                ...estado,
                perfil: accion.payload
            }
        case tipos.uiModuloSeleccionado:
            return{
                ...estado,
                modulo: accion.payload    
            }    
        case tipos.uiRetornaPermisos:
            return{
                ...estado,
                permisos: [...accion.payload]
            }    

        default:
            return estado;
    }
}