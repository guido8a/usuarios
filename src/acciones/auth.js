import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"
import { logoutEvento } from "./evento"
import { accion_cargaMenu, accion_cargaPerfil } from "./menu"

export const iniciaUsuario = (login, pass) => {

    return async (dispatch) => {  //dispatch viene de thunk
        console.log('iniciaLogin:', login, pass) 
        const resp = await fetchSinToken('usuario', { login, pass }, 'POST');

        //se lee el body:
        const body = await resp.json();
        console.log('body', body.ok)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            dispatch(loginUsuarioPerfil({id: body.id, usro: body.nombre}))
            dispatch(accion_cargaPerfil())
            return body.id
        } else {
            console.log(body.msg)
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
export const iniciaRegistro = (registroValores) => {

    console.log("valores inicia registro", registroValores)

      return async (dispatch) => {  //dispatch viene de thunk
        // const resp = await fetchSinToken('auth/registro', {nombre, mail, password}, 'POST' );
        // const resp = await fetchSinToken('user', {registroValores}, 'POST' );
        const resp = await fetchConToken('user', registroValores, 'POST');

        //se lee el body:
        const body = await resp.json();
        console.log('body', body)

        //se almacena el token en el localStore --nop es sensible
        if (body.ok) {
            // console.log('ok...')
            // localStorage.setItem('token', body.token)
            // localStorage.setItem('token-init-date', new Date().getTime())
            // dispatch( loginUsuario({
            //     uid: body.uid, 
            //     nombre: body.nombre
            // }))
            // Swal.fire('Realizado', "Usuario creado exitosamente!", 'success')
            // Toast.fire({icon: 'success', title: '!'})

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario creado exitosamente',
                showConfirmButton: false,
                timer: 2000
              })    

        } else {
            // Swal.fire('Error', body.msg, 'error')
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
            console.log('chequeo token body', body)
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