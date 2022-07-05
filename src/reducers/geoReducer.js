import { tipos } from "../tipos/tipos";

const estadoInicial = {
    provincias: [],
    cantones: [],
    parroquias: [],
    comunidades: []
}

export const geoReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.geoRetornarProvincias:
            return {
                ...estado,
                provincias: [...accion.payload]
            }
        case tipos.geoRetornarCantones:
            return {
                ...estado,
                cantones: [...accion.payload]
            }
        case tipos.geoRetornarParroquias:
            return {
                ...estado,
                parroquias: [...accion.payload]
            }
        case tipos.geoRetornarComunidades:
            return {
                ...estado,
                comunidades: [...accion.payload]
            }

        default:
            return estado;
    }
}

