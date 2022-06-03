import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"
import { retornaUsuarios } from "./datos"
import { logoutEvento } from "./evento"
import { accion_cerrarModal } from "./ui"

export const iniciaLogin = (login, pass) => {

    return async (dispatch) => {  //dispatch viene de thunk
        // console.log('iniciaLogin:', login, pass) 
        const resp = await fetchSinToken('login', { login, pass }, 'POST');

        //se lee el body:
        const body = await resp.json();
        console.log('body', body.ok)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            // console.log('ok...')
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(loginUsuario({
                uid: body.uid,
                nombre: body.nombre
            }))
        } else {
            console.log(body.msg)
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

//registro
export const iniciaRegistro = (registroValores, tipo) => {

    console.log("valores inicia registro ", registroValores, tipo)

    return async (dispatch) => {  //dispatch viene de thunk
        // const resp = await fetchSinToken('user', {registroValores}, 'POST' );

        let url
        let envio
        let mensaje

        if (tipo === -1) {
            url = 'user'
            envio = 'POST'
            mensaje = 'Usuario creado correctamente'
        } else {
            url = `user/${registroValores?.id}`
            envio = 'PUT'
            mensaje = 'Usuario actualizado correctamente'
        }

        // console.log("url ", url)
        // const resp = await fetchConToken('user', registroValores, 'POST');
        const resp = await fetchConToken(url, registroValores, envio);
        //se lee el body:
        const body = await resp.json();
        // console.log('body', body)

        if (body.ok) {
            // if (true) {
            // Swal.fire('Realizado', "Usuario creado exitosamente!", 'success')
            // Toast.fire({icon: 'success', title: '!'})

            dispatch(retornaUsuarios());
            dispatch(accion_cerrarModal());
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            Swal.fire('Error', "Error al crear el usuario", 'error')
        }
    }
}

//revisa si el token sigue válido
export const iniciaChequeoToken = () => {

    return async (dispatch) => {  //dispatch viene de thunk
        console.log('iniciaChequeoToken:')
        const resp = await fetchConToken('token', {}, 'POST');
        // const resp = await fetchSinToken( 'user', {}, 'GET' );
        console.log('>>>1', resp)
        //se lee el body:
        const body = await resp.json();
        console.log('body -->', body)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            // console.log('body', body)
            // localStorage.setItem('token', body.token)
            // localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(loginUsuario({
                uid: body.uid,
                nombre: body.nombre
            }))
        } else {
            dispatch(iniciaLogout())

            if (body.uid) {
                Swal.fire('Error', body.msg, 'error') //debe ir al login  
            }
            dispatch(finChequeo())
        }
    }
}

//llamadas al reducer
const loginUsuario = (usuario) => ({
    type: tipos.authLogin,
    payload: usuario
})

//finaliza el chequeo de token
const finChequeo = () => ({ type: tipos.authCheckingFin })

//debe borrar el localStore y limpiar el usuario en el reducer
export const iniciaLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(hacerLogout())
        dispatch(logoutEvento())
    }
}

const hacerLogout = () => ({ type: tipos.authLogout })