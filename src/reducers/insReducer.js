import { tipos } from "../tipos/tipos";

const estadoInicial = {
    instituciones: [],
    seleccionado: null,
    institucion: null,
    tipo: -1,
    modalInsOpen: false
}


export const insReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.insRetornaInstituciones:
            return {
                ...estado,
                instituciones: [...accion.payload]
            }
        case tipos.insSeleccionaInstitucion:
            return {
                ...estado,
                seleccionado: accion.payload
            }
        case tipos.insNoSeleccionaInstitucion:
            return {
                ...estado,
                seleccionado: null,
                institucion: null
            }
        case tipos.insEditarInstitucion:
            return {
                ...estado,
                modalInsOpen: true,
                tipo: 1,
                institucion: estado.instituciones.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.insNuevaInstitucion:
            return {
                ...estado,
                tipo: -1,
                modalInsOpen: true
            }
        case tipos.insCerraModalInstitucion:
            return {
                ...estado,
                modalInsOpen: false,
                institucion: null
            }
        case tipos.insBorrarInstitucion:
            return {
                ...estado,
                instituciones: estado.instituciones.filter(
                    e => (e.id !== accion.payload)
                )
            }
        default:
            return estado;
    }

}