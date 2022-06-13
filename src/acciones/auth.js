import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"
import { retornaUsuarios } from "./datos"
import { logoutEvento } from "./evento"
import { accion_cargaMenu, accion_cargaPerfil } from "./menu"
import { accion_cerrarModal } from "./ui"

export const iniciaUsuario = (login, pass) => {

    return async (dispatch) => {  //dispatch viene de thunk
        console.log('iniciaLogin:', login, pass) 
        const resp = await fetchSinToken('usuario', { login, pass }, 'POST');

        //se lee el body:
        const body = await resp.json();
        // console.log('body', body.ok)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            dispatch(loginUsuarioPerfil({id: body.id, usro: body.nombre}))
            dispatch(accion_cargaPerfil())
            return body.id
        } else {
            // console.log(body.msg)
            Swal.fire('Error', body.msg, 'error')
            return false
        }
    }
}

export const iniciaLogin = (id, login, perfil) => {
    return async (dispatch) => {  //dispatch viene de thunk
        console.log('iniciaLogin:', id, login, perfil) 
        perfil = parseInt(perfil, 10)
        const resp = await fetchSinToken('login', { id, login, perfil }, 'POST');

        //se lee el body:
        const body = await resp.json();
        console.log('***body Login', body.ok)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            // console.log('ok...')
            localStorage.setItem('token', body.token)
            // localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(loginUsuario({uid: body.uid, nombre: body.nombre, perfil: body.perfil}))
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
        // console.log('>>>1', resp)
        //se lee el body:
        const body = await resp.json();
        // console.log('body -->', body)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            // console.log('chequeo token body', body)
            localStorage.setItem('token', body.token)
            // localStorage.setItem('token-init-date', new Date().getTime())
            // dispatch(loginUsuario({uid: body.uid, nombre: body.nombre }))
            dispatch(loginUsuario({uid: body.uid, nombre: body.nombre, perfil: body.perfil}))
            dispatch(accion_cargaMenu(body.perfil ))

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
// export const loginUsuario = (usuario) => {
//     return async (dispatch) => {
//         // dispatch(accion_cargaMenu())
//         return {
//         type: tipos.authLogin,
//         payload: usuario
//         }
//     } 
// }

export const loginUsuario = (usuario) => ({
    type: tipos.authLogin,
    payload: usuario
})



const loginUsuarioPerfil = (usuario) => ({
    type: tipos.authLoginPerfil,
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