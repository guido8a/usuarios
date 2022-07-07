import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"


export const retornaProvincias = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('prov');
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargarProvincias(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar las provincias", "error");
            }

        } catch (error) {
            console.log("error al retornar provincias", error)
        }
    }
}

export const retornaCantones = (provincia) => {
    return async (dispatch) => {

        try {
            // const resp = await fetchConToken(`canton/${provincia}`);
            const resp = await fetchConToken(`cntn`);
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargarCantones(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar los cantones", "error");
            }

        } catch (error) {
            console.log("error al retornar cantones", error)
        }
    }
}

export const retornaParroquias = (canton) => {
    return async (dispatch) => {

        try {
            // const resp = await fetchConToken(`parroquia/${canton}`);
            const resp = await fetchConToken(`parr`);
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargarParroquias(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar las parroquias", "error");
            }

        } catch (error) {
            console.log("error al retornar parroquias", error)
        }
    }
}

export const retornaComunidades = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`cmnd`);
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargarComunidades(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar las comunidades", "error");
            }

        } catch (error) {
            console.log("error al retornar comunidades", error)
        }
    }
}


const cargarProvincias = (provincias) => {
    return {
        type: tipos.geoRetornarProvincias,
        payload: provincias
    }
}

const cargarCantones = (cantones) => {
    return {
        type: tipos.geoRetornarCantones,
        payload: cantones
    }
}

const cargarParroquias = (parroquias) => {
    return {
        type: tipos.geoRetornarParroquias,
        payload: parroquias
    }
}

const cargarComunidades = (comunidades) => {
    return {
        type: tipos.geoRetornarComunidades,
        payload: comunidades
    }
}

export const seleccionarElemento = (id) => {
    return {
        type: tipos.geoElementoSeleccionado,
        payload: id
    }
}

export const abrirModalGeo = () => {
    return {
        type: tipos.geoAbrirModal
    }
}

export const cerrarModalGeo = () => {
    return {
        type: tipos.geoCerrarModal
    }
}

export const editarCanton = (id) => {
    return {
        type: tipos.geoEditarCanton,
        payload: id
    }
}
