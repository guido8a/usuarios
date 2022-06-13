import { tipos } from "../tipos/tipos";

const estadoInicial = {
    seleccionado: null
}

export const arbolReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.uiElementoArbol:
            return {
                ...estado,
                seleccionado: accion.payload
            }
        default:
            return estado;
    }
}