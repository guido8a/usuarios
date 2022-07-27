import { tipos } from "../tipos/tipos";

const estadoInicial = {
    fincas: [],
    idFinca: null,
    finca: null,
    modalFincasOpen: false,
    tipo: -1,
    tiposOcupacion: []
}

export const fincasReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.finRetornaFincas:
            return {
                ...estado,
                fincas: [...accion.payload]
            }
        case tipos.finSeleccionarFinca:
            return {
                ...estado,
                idFinca: accion.payload
            }
        case tipos.finNoseleccionarFinca:
            return {
                ...estado,
                idFinca: null,
                finca: null
            }
        case tipos.finNuevaFinca:
            return {
                ...estado,
                modalFincasOpen: true,
                tipo: -1
            }
        case tipos.finCerrarModalFinca:
            return {
                ...estado,
                modalFincasOpen: false,
                // tipo: -1,
                // finca: null
            }
        case tipos.finEditarFinca:
            return {
                ...estado,
                modalFincasOpen: true,
                tipo: 1,
                finca: accion.payload
            }
        case tipos.finBorrarFinca:
            return {
                ...estado,
                idFinca: null,
                finca: null
            }
        case tipos.finVerFinca:
            return {
                ...estado,
                modalFincasOpen: true,
                tipo: 0,
                finca: accion.payload
            }
        case tipos.finCargarFinca:
            return {
                ...estado,
                finca: accion.payload
            }
        case tipos.finRetornaTiposOcupacion:
            return {
                ...estado,
                tiposOcupacion: [...accion.payload]
            }
        default:
            return estado;
    }
}

