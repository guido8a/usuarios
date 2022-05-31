
import { fetchUsuarios } from "../helpers/fetch"
import moment from 'moment'
import { tipos } from "../tipos/tipos";

// retorna usuarios de la BBDD
export const retornaUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchUsuarios();
            const body = await resp.json();
            // console.log("usuarios", body)
            if (body.ok) {
                const usuarios = arregloDatosUsuarios(body.Registro);
                //    console.log("usuarios formateados", usuarios)
                dispatch(cargaUsuarios(usuarios));
            }
        } catch (error) {
            console.log("error al sacar los datos de usuario de la BD", error)
        }
    }
}

const arregloDatosUsuarios = (usuarios = []) => {
    return usuarios.map(
        (e) => ({
            ...e,
            fechaInicio: moment(e.fechaInicio).toDate(),
            fechaFin: moment(e.fechaFin).toDate(),
            fechaPass: moment(e.fechaPass).toDate(),
        })
    )
}

const arregloUsuario = (usuario) => {
    return {
        ...usuario,
        fechaInicio: moment(usuario.fechaInicio).toDate(),
        fechaFin: moment(usuario.fechaFin).toDate(),
        fechaPass: moment(usuario.fechaPass).toDate(),
    }
}

const cargaUsuarios = (usuarios) => {
    return {
        type: tipos.uiTablaUsuarios,
        payload: usuarios
    }
}

//seleccionar un usuario para su edicion o borrado
export const seleccionaUsuario = (usuario) => {
    return {
        type: tipos.uiUsuarioSeleccionado,
        payload: usuario
    }
}

//ningún usuario seleccionado
export const noUsuarioSeleccionado = () => {
    return {
        type: tipos.uiNoUsuarioSeleccionado,
    }
}

//retorna usuario especifico
export const retornaUsuarioEspecifico = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchUsuarios(id);
            const body = await resp.json();
            console.log("usuario especifico ", body)
            if (body.ok) {
                const usuario = arregloUsuario(body.Registro)
                //    dispatch(cargaUsuarioEspecifico(body.Registro));
                dispatch(cargaUsuarioEspecifico(usuario));
            }
        } catch (error) {
            console.log("error al sacar los datos de usuario de la BD", error)
        }
    }
}

const cargaUsuarioEspecifico = (usuario) => {
    return {
        type: tipos.uiRetornaUsuario,
        payload: usuario
    }
}