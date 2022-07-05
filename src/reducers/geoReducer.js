import { tipos } from "../tipos/tipos";

const estadoInicial = {
    provincias: [],
    cantones: [],
    parroquias: []
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
        case tipos.geoLimpiezaParroquias:
            return{
                ...estado,
                parroquias: []
            }    
        default:
            return estado;
    }
}

