import { tipos } from '../tipos/tipos';

const estadoInicial = {
    modalOpen: false,
    idUsuario: null,
    usuario: null,
    tipo: -1,
    usuarios: [],
    fincas: [],
    usuariosxfincas: [],
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
                tipo: -1
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
            return {
                ...estado,
                modalOpen: true
            }

        case tipos.uiEditarUsuario:
            return {
                ...estado,
                modalOpen: true,
                tipo: 1,
                usuario: estado.usuarios.filter(
                    e => (e.id === accion.payload)
                )
            }

        case tipos.uiTablaUsuarios:
            return {
                ...estado,
                usuarios: [...accion.payload]
            }

        case tipos.uiBorrarUsuario:
            return {
                ...estado,
                idUsuario: null,
                usuario: null,
                tipo: -1,
            }

        case tipos.uiRetornaFincas:
            return {
                ...estado,
                fincas: [...accion.payload]
            }
        case tipos.uiRetornaUsuariosFincas:
            return {
                ...estado,
                usuariosxfincas: estado.usuarios.filter(
                    e => (e.fincaid === accion.payload)
                )
            }

        default:
            return estado;
    }
}
