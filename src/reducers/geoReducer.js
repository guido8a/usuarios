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
    cantonesxProvincia: [],
    parroquiasxCanton: [],
    comunidadesxParroquia: [],
    comunidadSeleccionada: null,
    provincia: null,
    canton: null,
    parroquia: null,
    comunidad: null
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
                elemento: null,
                tipo: -1,
                cantonesxProvincia: [],
                parroquiasxCanton: [],
                comunidadesxParroquia: []
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
                elemento: null,
                cantones: estado.cantones.filter(
                    e => (e.id !== accion.payload)
                )
            }
        case tipos.geoVerCanton:
            return {
                ...estado,
                modalOpen: true,
                tipo: 0,
                elemento: estado.cantones.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoEditarParroquia:
            return {
                ...estado,
                tipo: 1,
                modalOpen: true,
                elemento: estado.parroquias.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoNuevaParroquia:
            return {
                ...estado,
                modalOpen: true
            }
        case tipos.geoVerParroquia:
            return {
                ...estado,
                tipo: 0,
                modalOpen: true,
                elemento: estado.parroquias.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoBorrarParroquia:
            return {
                ...estado,
                seleccionado: null,
                tipoGeografia: null,
                elemento: null,
                parroquias: estado.parroquias.filter(
                    e => (e.id !== accion.payload)
                )
            }
        case tipos.geoEditarComunidad:
            return {
                ...estado,
                modalOpen: true,
                tipo: 1,
                elemento: estado.comunidades.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoNuevaComunidad:
            return {
                ...estado,
                modalOpen: true
            }
        case tipos.geoVerComunidad:
            return {
                ...estado,
                modalOpen: true,
                tipo: 0,
                elemento: estado.comunidades.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoBorrarComunidad:
            return {
                ...estado,
                seleccionado: null,
                tipoGeografia: null,
                elemento: null,
                comunidades: estado.comunidades.filter(
                    e => (e.id !== accion.payload)
                )
            }
        case tipos.geoCantonesxProvincia:
            return {
                ...estado,
                cantonesxProvincia: [...accion.payload],
                parroquiasxCanton: [],
                comunidadesxParroquia: []
            }
        case tipos.geoRetornaParroquiasxCanton:
            return {
                ...estado,
                parroquiasxCanton: [...accion.payload],
                comunidadesxParroquia: []
            }
        case tipos.geoRetornaComunidadesxParroquia:
            return {
                ...estado,
                comunidadesxParroquia: [...accion.payload]
            }
        case tipos.geoSeleccionaComunidad:
            return {
                ...estado,
                comunidadSeleccionada: accion.payload
            }
        case tipos.geoCargarProvincia:
            return {
                ...estado,
                provincia: estado.provincias.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoCargarCanton:
            return {
                ...estado,
                canton: estado.cantones.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoCargarParroquia:
            return{
                ...estado,
                parroquia: estado.parroquias.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.geoCargarComunidad:
            return{
                ...estado,
                comunidad: estado.comunidades.filter(
                    e => (e.id === accion.payload)
                )
            }        
        default:
            return estado;
    }
}

