import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { tipos } from "../tipos/tipos";

//carga el menú de un perfil 
export const accion_cargaModulos = ( ) => {
    // console.log('****módulos')
    return async(dispatch, getState ) => {  //vienen del thunk
        try {
            const resp = await fetchConToken('modulos')
            const body = await resp.json()
            // console.log('body_modulos: ', body.Registro)
            if(body.ok) {
                const modulos = body.Registro
                dispatch( poneModulos(modulos) )
            }
    
        } catch (error) {
            console.log(error)            
        }
    }
}

const poneModulos = (modulos) => ({
    type: tipos.modulosCargar,
    payload: modulos
})


//carga el menú de un perfil 
export const accion_cargaRutas = ( id ) => {
    // console.log('****rutas')
    return async(dispatch, getState ) => {  //vienen del thunk
        try {
            const resp = await fetchConToken(`rutas/${id}`)
            const body = await resp.json()
            // console.log('body_rutas: ', body.Registro)
            if(body.ok) {
                const rutas = body.Registro
                dispatch( poneRutas(rutas) )
            }
    
        } catch (error) {
            console.log(error)            
        }
    }
}

const poneRutas = (rutas) => ({
    type: tipos.modulosRutas,
    payload: rutas
})

export const poneRutaActiva = (id) => ({
    type: tipos.modulosRutaActiva,
    payload: id
})

export const accion_bd_actualizaRuta = ( ruta, modulo ) => {
    return async(dispatch, getState ) => {  //vienen del thunk
        // const { uid, nombre } = getState().auth  
        try {
            const resp = await fetchConToken(`ruta/${ruta.id}`, ruta, 'PUT')
            const body = await resp.json()
            if(body.ok) {
                dispatch( accion_actualizaRuta(ruta, modulo) )
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
            // console.log('evento a actualizar: ', evento)
    
        } catch (error) {
            console.log(error)            
        }
    }
}

const accion_actualizaRuta = (ruta, modulo) => ({
    type: tipos.actualizaRuta,
    payload: {...ruta, modulo: modulo }
})

export const accion_lipiarRuta = () => ({
    type: tipos.enceraRutaActiva
})

export const accion_bd_creaRuta = ( ruta ) => {
    return async(dispatch, getState ) => {  //vienen del thunk
        // const { uid, nombre } = getState().auth  
        try {
            const resp = await fetchConToken(`ruta`, ruta, 'POST')
            const body = await resp.json()
            if(body.ok) {
                dispatch( accion_cargaRutas(ruta.moduloid) )
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
            // console.log('evento a actualizar: ', evento)
    
        } catch (error) {
            console.log(error)            
        }
    }
}

