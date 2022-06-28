import Swal from "sweetalert2";
import { fetchConToken, fetchPerfiles, fetchPermisos } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"

export const iniciaCargaPerfiles = () => {
    return async (dispatch) => {

        const resp = await fetchPerfiles('GET');
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargaPerfiles(body.Registro));
        } else {
            Swal.fire("Error", "Error al retonar la lista de perfiles", "error")
        }
    }
}

export const iniciaCargaPermisos = (perfil) => {

    return async (dispatch, getState) => {
        const { modulo } = getState().perfiles
        const resp = await fetchPermisos(perfil, modulo, 'GET');
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargarPermisos(body.Registro))
        } else {
            Swal.fire("Error", "Error al retornar los permisos", "error")
        }
    }
}


export const inicioGuardadoPermisos = (permisos, perfil, modulo) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`ponePrms/${perfil}/${modulo}`, permisos, 'POST');
        const body = await resp.json();

        if (body.ok) {
            dispatch(guardaPermisos());
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Permisos guardados correctamente",
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            Swal.fire("Error", "Error al guardar los permisos", "error")
        }
    }
}

//guardar perfil
export const inicioGuardarPerfil = (valores, tipo) => {

    return async (dispatch) => {

        let url
        let envio
        let mensaje

        if (tipo === -1) {
            url = 'prfl'
            envio = 'POST'
            mensaje = 'Perfil creado correctamente'
        } else {
            url = `prfl/${valores?.id}`
            envio = 'PUT'
            mensaje = 'Perfil actualizado correctamente'
        }

        const resp = await fetchConToken(url, valores, envio);
        const body = await resp.json();

        if (body.ok) {
            dispatch(iniciaCargaPerfiles());
            dispatch(cerrarModalPerfil());
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            Swal.fire('Error', "Error al guardar el perfil", 'error');
        }
    }
}

//borrar perfil

export const borrarPerfil = (perfil) => {
    return async (dispatch) => {
      try {
        const resp = await fetchConToken(`prfl/${perfil}`, perfil, 'DELETE');
        const body = await resp.json();

        if(body.ok){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Perfil borrado correctamente",
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(perfilBorrado());
            dispatch(iniciaCargaPerfiles());
            setTimeout(() => {
                dispatch(perfilNoSeleccionado());
            }, 500);
        }else{
            Swal.fire('Error', 'Error al borrar el perfil', 'error')
        }

      } catch (error) {
          console.log("error al borrar el perfil")
      }  
    }
}


const cargaPerfiles = (perfiles) => {
    return {
        type: tipos.uiRetornaPerfiles,
        payload: perfiles
    }
}

const cargarPermisos = (permisos) => {
    return {
        type: tipos.uiRetornaPermisos,
        payload: permisos
    }
}

export const perfilSeleccionado = (perfil) => {
    return {
        type: tipos.uiPerfilSeleccionado,
        payload: perfil
    }
}

export const moduloSeleccionado = (modulo) => {
    return {
        type: tipos.uiModuloSeleccionado,
        payload: modulo
    }
}

const guardaPermisos = () => {
    return {
        type: tipos.uiGuardaPermisos
    }
}

export const perfilNoSeleccionado = () => {
    return {
        type: tipos.uiNoPerfilSeleccionado
    }
}

export const nuevoPerfil = () => {
    return {
        type: tipos.uiNuevoPerfil
    }
}

export const editarPerfil = (perfil) => {
    return {
        type: tipos.uiEditarPerfil,
        payload: perfil
    }
}

export const cerrarModalPerfil = () => {
    return {
        type: tipos.uiCerrarModalPerfil
    }
}

const perfilBorrado = () => {
    return{
        type: tipos.uiBorrarPerfil
    }
}