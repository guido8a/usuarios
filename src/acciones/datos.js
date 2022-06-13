
import { fetchConToken } from "../helpers/fetch"
import moment from 'moment'
import { tipos } from "../tipos/tipos";
import Swal from "sweetalert2";

// retorna usuarios de la BBDD
export const retornaUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('user');
            const body = await resp.json();
            if (body.ok) {
                const usuarios = arregloDatosUsuarios(body.Registro);
                dispatch(cargaUsuarios(usuarios));
            }
        } catch (error) {
            console.log("error al sacar los datos de usuario de la BD", error)
        }
    }
}

//retorna las fincas de la BD
export const retornaFincas = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('finca');
            const body = await resp.json();

            if (body.ok) {
                const fincas = arregloDatosFincas(body.Registro)
                dispatch(cargaFincas(fincas));
            }

        } catch (error) {
            console.log("error al retornar los datos de las fincas de la BD", error)
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

const arregloDatosFincas = (fincas = []) => {
    return fincas.map(
        (e) => ({
            ...e,
            fechaInicio: moment(e.fechaInicio).toDate(),
            fechaFin: moment(e.fechaFin).toDate(),
        })
    )
}

const cargaUsuarios = (usuarios) => {
    return {
        type: tipos.uiTablaUsuarios,
        payload: usuarios
    }
}
//retorna las fincas
const cargaFincas = (fincas) => {
    return {
        type: tipos.uiRetornaFincas,
        payload: fincas
    }
}

export const cargarUsuariosxFinca = (finca) => {
    return{
        type: tipos.uiRetornaUsuariosFincas,
        payload: finca
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
            // const resp = await fetchUsuarios(id);
            const resp = await fetchConToken(`user/${id}`);
            const body = await resp.json();
            if (body.ok) {
                const usuario = arregloUsuario(body.Registro)
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

//borrar usuario
export const borrarUsuario = (usuario) => {

    console.log("borrar: ", usuario)

    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`user/${usuario}`, usuario, "DELETE");
            const body = await resp.json();

            if (body.ok) {
                // if (true) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Usuario borrado correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(usuarioBorrado());
                dispatch(retornaUsuarios());
                setTimeout(() => {
                    dispatch(noUsuarioSeleccionado());
                }, 500);

            } else {
                Swal.fire('Error', 'Error al borrar el usuario', 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const usuarioBorrado = () => {
    return {
        type: tipos.uiBorrarUsuario
    }
}