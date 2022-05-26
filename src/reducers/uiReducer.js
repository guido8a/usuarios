import { tipos } from '../tipos/tipos';

const estadoInicial = {
    modalOpen: false,
    terminado: false
}

export const uiReducer = (estado = estadoInicial, accion) => {
    // console.log('reducer: ', accion.type)
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

        default:
            return estado;
    }
}
