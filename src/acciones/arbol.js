import { tipos } from "../tipos/tipos"

export const seleccionaElementoArbol = (elemento) => {
    return{
        type: tipos.uiElementoArbol,
        payload: elemento
    }

}