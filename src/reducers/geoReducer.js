import { tipos } from "../tipos/tipos";

const estadoInicial = {
    seleccionado: null,
    elemento: null,
    modalOpen: false,
    tipo: -1,
    tipoGeografia: null,
    provincias: [],
    cantones: [],
    parroquias: [],
    comunidades: [],
}

export const geoReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.geoElementoSeleccionado:
            return {
                ...estado,
                seleccionado: accion.payload.id,
                elemento: null,
                tipoGeografia: accion.payload.tipoGeografia
            }
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
        case tipos.geoAbrirModal:
            return {
                ...estado,
                modalOpen: true
            }
        case tipos.geoCerrarModal:
            return {
                ...estado,
                modalOpen: false,
                tipo: -1
            }
        case tipos.geoEditarCanton:
            return {
                ...estado,
                modalOpen: true,
                tipo: 1,
                elemento: estado.cantones.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoNuevoCanton:
            return {
                ...estado,
                modalOpen: true
            }
        case tipos.geoBorrarCanton:
            return {
                ...estado,
                seleccionado: null,
                tipoGeografia: null,
                elemento: null
            }
        default:
            return estado;
    }
}

