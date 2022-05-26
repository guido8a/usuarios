
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

const cargaUsuarios = (usuarios) => {
    return{
        type: tipos.uiTablaUsuarios,
        payload: usuarios
    }
}