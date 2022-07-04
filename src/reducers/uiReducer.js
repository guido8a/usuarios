import { tipos } from '../tipos/tipos';

const estadoInicial = {
    modalOpen: false,
    modalPerfilOpen: false,
    idUsuario: null,
    usuario: null,
    tipo: -1,
    usuarios: [],
    perfiles: [],
    perfilesUsuario: []
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
                modalPerfilOpen: false,
                usuario: null,
                tipo: -1,
                perfilesUsuario: [],
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
                tipo: -1,
                perfilesUsuario: [],
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
        case tipos.uiCargaPerfilesUsuario:
            return{
                ...estado,
                modalPerfilOpen: true,
                perfilesUsuario : [...accion.payload]
            }   
        default:
            return estado;
    }
}
