import { string } from "yup/lib/locale";
import { tipos } from "../tipos/tipos";

const estadoInicial = {
    modulos: [],
    rutas: [],
    rutaActiva: ''
}

export const moduloReducer = (estado = estadoInicial, accion) => {
    // console.log('modulo reducer -> accion-tipo:', accion.type, accion.payload)
    switch (accion.type) {
        case tipos.modulosCargar:
            // console.log('pone modulos', [ ...accion.payload ])
            return {
                ...estado,
                modulos: [...accion.payload],
            }

        case tipos.modulosRutas:
            // console.log('pone rutas', [ ...accion.payload ])
            return {
                ...estado,
                rutas: [...accion.payload],
            }

        case tipos.modulosRutaActiva:
            // console.log('modulosRutaActiva', parseInt(accion.payload) )
            return {
                ...estado,
                // rutaActiva: estado.rutas[1]
                rutaActiva: estado.rutas.filter(
                    e => (e.id === parseInt(accion.payload)))[0],
            }

        case tipos.actualizaRuta:
            // console.log('actualizaRuta', parseInt(accion.payload) )
            return {
                ...estado,
                rutas: estado.rutas.map(
                    e => (e.id === accion.payload.id) ? accion.payload : e
                )
            }

        case tipos.enceraRutaActiva:
            // console.log('actualizaRuta', parseInt(accion.payload) )
            return {
                ...estado,
                rutaActiva: null
            }

        default:
            return estado;
    }
}