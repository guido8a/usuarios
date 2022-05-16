import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { preparaEventos } from "../helpers/preparaEventos";
import { tipos } from "../tipos/tipos";


export const accion_bd_nuevoEvento = ( evento ) => {
    return async(dispatch, getState ) => {  //vienen del thunk
        const { uid, nombre } = getState().auth  
        try {
            const resp = await fetchConToken('eventos', evento, 'POST')
            const body = await resp.json()
            if(body.ok) {
                evento.id = body.evento.id
                evento.usuario = {
                    id: uid,
                    nombre: nombre
                }
                dispatch( accion_nuevoEvento(evento) )
            }
            console.log('evento a grabar: ', evento)
    
        } catch (error) {
            console.log(error)            
        }
    }
}

//se quita el export para llamada local
const accion_nuevoEvento = ( evento ) => ({
    type: tipos.eventoNuevoEvento,
    payload: evento
})

export const accion_eventoActivo = ( evento ) => ({
    type: tipos.eventoActivo,
    payload: evento
})

export const accion_lipiarActiva = () => ({
    type: tipos.enceraEventoActivo
})

export const accion_bd_actualizaEvento = ( evento ) => {
    return async(dispatch, getState ) => {  //vienen del thunk
        // const { uid, nombre } = getState().auth  
        try {
            const resp = await fetchConToken(`eventos/${evento.id}`, evento, 'POST')
            const body = await resp.json()
            if(body.ok) {
                dispatch( accion_actualizaEvento(evento) )
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
            // console.log('evento a actualizar: ', evento)
    
        } catch (error) {
            console.log(error)            
        }
    }
}

const accion_actualizaEvento = (evento) => ({
    type: tipos.actualizaEvento,
    payload: evento
})


export const accion_bd_borrarEvento = ( ) => {
    return async(dispatch, getState ) => {  //vienen del thunk
        //se obtiene el id del evento actuvo del store "cal"
        const { id } = getState().cal.eventoActivo
        try {
            const resp = await fetchConToken(`eventos/${id}`, {}, 'DELETE')
            const body = await resp.json()
            if(body.ok) {
                dispatch( accion_borraEvento() )
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
            // console.log('evento a actualizar: ', evento)
    
        } catch (error) {
            console.log(error)            
        }
    }
}


const accion_borraEvento = () => ({
    type: tipos.borrarEvento
})


//acciones para mostrar eventos desde la BBDD
export const iniciaCargaEventos = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await fetchConToken('eventos') //no hace fala poner GET
            const body = await resp.json()
            if(body.ok) {
                const eventos = preparaEventos( body.eventos )
                console.log('retorna: ', eventos)
                //hay que modificar la fecha por DateTime
                // evento.id = body.evento.id
                // evento.usuario = {
                //     id: uid,
                //     nombre: nombre
                // }
                
                dispatch( cargaEvento( eventos) )
            }
            
    
        } catch (error) {
            console.log(error)            
        }
    }

}

const cargaEvento = (eventos) => ({
    type: tipos.cargarEvento,
    payload: eventos
})

export const logoutEvento = () => ({ type: tipos.logoutEvento })

