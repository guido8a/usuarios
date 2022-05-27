import { tipos } from '../tipos/tipos';

const estadoInicial = {
    modalOpen: false,
    terminado: false,
    idUsuario: null,
    usuario: null
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
                modalOpen: false
            }
        case tipos.uiRegistroCorrecto:
            return {
                ...estado,
                terminado: true
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
                usuario: null
            }

        case tipos.uiRetornaUsuario:
            return {
                ...estado,
                usuario: accion.payload
            }

        case tipos.uiAbrirModalRegistro:
            return {
                ...estado,
                modalOpen: true
            }

        default:
            return estado;
    }
}
