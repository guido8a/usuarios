import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"
import { logoutEvento } from "./evento"


export const iniciaLogin = (mail, password) => {
    
    return async( dispatch) => {  //dispatch viene de thunk
        // console.log('iniciaLogin:', mail, password) 
        // const resp = await fetchSinToken('auth/login', {mail, password}, 'POST' );
        const resp = await fetchSinToken('api/user', {mail, password}, 'POST' );

        //se lee el body:
        const body = await resp.json();
        console.log('body', body)

        //se almacena el token en el localStore --nop es sensible
        if( body.ok ) {
            // console.log('ok...')
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( login({
                uid: body.uid, 
                nombre: body.nombre
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

//registro
export const iniciaRegistro = (nombre, mail, password) => {
    
    return async( dispatch) => {  //dispatch viene de thunk
        // console.log('iniciaRegistro:', mail, password) 
        const resp = await fetchSinToken('auth/registro', {nombre, mail, password}, 'POST' );

        //se lee el body:
        const body = await resp.json();
        // console.log('body', body)

        //se almacena el token en el localStore --nop es sensible
        if( body.ok ) {
            // console.log('ok...')
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( login({
                uid: body.uid, 
                nombre: body.nombre
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

//revisa si el token sigue válido
export const iniciaChequeoToken = () => {
    
    return async( dispatch) => {  //dispatch viene de thunk
        console.log('iniciaChequeoToken:') 
        // const resp = await fetchConToken( 'auth/token', {}, 'POST' );
        const resp = await fetchSinToken( 'user', {}, 'GET' );
        console.log('...1', resp)

        //se lee el body:
        const body = await resp.json();
        console.log('body -->', body)

        //se almacena el token en el localStore --nop es sensible
        if( body.ok ) {
            // console.log('ok...')
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( login({
                uid: body.uid, 
                nombre: body.nombre
            }))
        } else {
            if(body.uid){
               Swal.fire('Error', body.msg, 'error') //debe ir al login  
            }           
            dispatch( finChequeo() )
        }
    }
}


//llamadas al reducer
const login = (usuario) => ({
    type: tipos.authLogin,
    payload: usuario
})

//finaliza el chequeo de token
const finChequeo = () => ({ type: tipos.authCheckingFin })

//debe borrar el localStore y limpiar el usuario en el reducer
export const iniciaLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( hacerLogout() )
        dispatch( logoutEvento() )
    }
}

const hacerLogout = () => ({ type: tipos.authLogout })



