import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchPerfiles, fetchPermisos } from "../helpers/fetch"
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