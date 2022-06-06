import { tipos } from "../tipos/tipos";

const estadoInicial = {
    checking: true,
    usuarioId: 0,
    usuario: ""
}

export const authReducer = (estado = estadoInicial, accion) => {
    // console.log('accion-tipo:', accion.type)
    switch (accion.type) {
        case tipos.authLogin:
            console.log('estado:', estado, estadoInicial.checking, accion.payload)
            return {
                ...estado,
                ...accion.payload,
                checking: false
            }
        case tipos.authLoginPerfil:
            console.log('auth perfil', estado, accion.payload)
            return {
                ...estado,
                usuarioId: accion.payload.id,
                usuario: accion.payload.usro,
                checking: false
            }
        case tipos.authCheckingFin:
            return {
                ...estado,
                checking: false
            }
        case tipos.authLogout:
            return {
                uid: "",
                nombre: "",
                checking: false
            }

        default:
            return estado;
    }
}