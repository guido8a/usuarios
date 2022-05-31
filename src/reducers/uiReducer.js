import { tipos } from '../tipos/tipos';

const estadoInicial = {
    modalOpen: false,
    idUsuario: null,
    usuario: null,
    tipo: -1
}

export const uiReducer = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case tipos.uiAbrirModal:
            return {
                ...estado,
                modalOpen: true
            }
        case tipos.uiCerrarModal:
            return {
                ...estado,
                modalOpen: false,
                usuario: null,
            }

        case tipos.uiUsuarioSeleccionado:
            return {
                ...estado,
                idUsuario: accion.payload
            }

        case tipos.uiNoUsuarioSeleccionado:
            return {
                ...estado,
                idUsuario: null,
                usuario: null,
                tipo: -1
            }

        case tipos.uiRetornaUsuario:
            return {
                ...estado,
                usuario: accion.payload
            }

        case tipos.uiAbrirModalRegistro:
            return {
                ...estado,
                modalOpen: true,
                tipo: accion.payload
            }

            case tipos.uiNuevoUsuario:
                return{
                    ...estado,
                    modalOpen: true                        
                }

        default:
            return estado;
    }
}
