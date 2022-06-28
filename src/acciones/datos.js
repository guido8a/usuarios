
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import moment from 'moment'
import { tipos } from "../tipos/tipos";
import Swal from "sweetalert2";
import { accion_cerrarModal } from "./ui";

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

export const cargarUsuariosxFinca = (finca) => {
    return {
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

export const iniciaCargaPerfilesxUsuario = (usuario) => {
    return async (dispatch) => {
        try {
            const resp = await fetchSinToken(`perfiles/${usuario}`, {}, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargarPerfilesUsuario(body.Registro))
            } else {
                Swal.fire("Error", "Error al cargar los perfiles del usuario", "error")
            }
        } catch (error) {
            console.log("error al sacar los perfiles x usuario", error)
        }

    }
}

const cargarPerfilesUsuario = (perfiles) => {
    return {
        type: tipos.uiCargaPerfilesUsuario,
        payload: perfiles
    }
}

//guardar perfiles del usuario

export const guardarPerfilesxUsuario = (valores, usuario) => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken(`poneperfiles/${usuario}`, valores, 'POST');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Perfiles guardados correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })

                dispatch(accion_cerrarModal());
            } else {
                Swal.fire("Error", "Error al guardar los perfiles del usuario", "error")
            }

        } catch (error) {
            console.log("error al guardar los perfiles del usuario", error)
        }

    }
}