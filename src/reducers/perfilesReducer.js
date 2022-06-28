import { tipos } from "../tipos/tipos";

const estadoInicial = {
    todos: [],
    perfil: null,
    modulo: null,
    permisos: [],
    perfilSeleccionado: null,
    modalOpen: false,
    tipo: -1
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
        case tipos.uiNoPerfilSeleccionado:
            return{
                ...estado,
                perfil: null
            }
        case tipos.uiNuevoPerfil:
            return{
                ...estado,
                modalOpen: true
            }        
        case tipos.uiEditarPerfil:
            return {
                ...estado,
                modalOpen: true,
                tipo: 1,
                perfilSeleccionado: estado.todos.filter(
                    e => (e.id === accion.payload)
                )
            } 
        case tipos.uiCerrarModalPerfil:
            return{
                ...estado,
                modalOpen: false,
                tipo: -1,
                perfilSeleccionado: null
            }  
        case tipos.uiBorrarPerfil:
            return{
                ...estado,
                perfil: null,
                perfilSeleccionado: null,
                tipo: -1
            }    
            

        default:
            return estado;
    }
}