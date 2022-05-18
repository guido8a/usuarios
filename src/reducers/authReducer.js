import { tipos } from "../tipos/tipos";

const estadoInicial = {
    checking: true,
}

export const authReducer = (estado = estadoInicial, accion) => {
    // console.log('accion-tipo:', accion.type)
    switch (accion.type) {
        case tipos.authLogin:
            // console.log(estado, estadoInicial.checking, accion.payload)
            return {
                ...estado,
                ...accion.payload,
                checking: false
            }
        case tipos.authCheckingFin:
            return {
                ...estado,
                checking: false
            }
        case tipos.authLogout:
            return {
                checking: false
            }

        default:
            return estado;
    }
}