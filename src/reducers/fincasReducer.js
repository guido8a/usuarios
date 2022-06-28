import { tipos } from "../tipos/tipos";

const estadoInicial = {
    fincas: []
}

export const fincasReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.finRetornaFincas:
            return {
                ...estado,
                fincas: [...accion.payload]
            }
        default:
            return estado;
    }
}