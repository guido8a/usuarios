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

export const guardaCanton = (valores, tipo) => {
    return async (dispatch) => {
        let url
        let mensaje
        let envio

        if (tipo === -1) {
            url = 'cntn'
            envio = 'POST'
            mensaje = 'Cantón guardado correctamente'
        } else {
            url = `cntn/${valores.id}`
            envio = 'PUT'
            mensaje = 'Cantón actualizado correctamente'
        }

        const resp = await fetchConToken(url, valores, envio);
        const body = await resp.json();

        if (body.ok) {
            dispatch(cerrarModalGeo());
            dispatch(retornaCantones());
            dispatch(retornaParroquias());
            dispatch(retornaComunidades());

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            dispatch(cerrarModalGeo());
            Swal.fire('Error', "Error al guardar el cantón", 'error')
        }
    }
}

export const borrarCanton = (canton) => {

    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`cntn/${canton}`, canton, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Cantón borrado correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })

                dispatch(borrandoCanton(canton));
            } else {
                Swal.fire("Error", "Error al borrar el cantón", "error")
            }

        } catch (error) {
            console.log("Error al borrar el canton", error)
        }
    }
}

export const guardarParroquia = (valores, tipo) => {
    return async (dispatch) => {

        let url
        let mensaje
        let envio

        if (tipo === -1) {
            url = 'parr'
            envio = 'POST'
            mensaje = 'Parroquia guardada correctamente'
        } else {
            url = `parr/${valores.id}`
            envio = 'PUT'
            mensaje = 'Parroquia actualizada correctamente'
        }

        const resp = await fetchConToken(url, valores, envio);
        const body = await resp.json();

        if (body.ok) {
            dispatch(cerrarModalGeo());
            dispatch(retornaParroquias());
            dispatch(retornaComunidades());

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            dispatch(cerrarModalGeo());
            Swal.fire("Error", "Error al guardar la parroquia", "error")
        }

    }
}

export const borrarParroquia = (parroquia) => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken(`parr/${parroquia}`, parroquia, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Parroquia borrada correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })

                dispatch(borrandoParroquia(parroquia));
            } else {
                Swal.fire("Error", "Error al borrar la parroquia", "error")
            }
        } catch (error) {
            console.log("error al borrar la parroquia", error)
        }
    }
}

export const guardarComunidad = (valores, tipo) => {
    return async (dispatch) => {

        let url
        let mensaje
        let envio

        if (tipo === -1) {
            url = 'cmnd'
            envio = 'POST'
            mensaje = 'Comunidad guardada correctamente'
        } else {
            url = `cmnd/${valores.id}`
            envio = 'PUT'
            mensaje = 'Comunidad actualizada correctamente'
        }

        const resp = await fetchConToken(url, valores, envio);
        const body = await resp.json();

        if (body.ok) {

            dispatch(cerrarModalGeo());
            dispatch(retornaComunidades());

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            dispatch(cerrarModalGeo());
            Swal.fire("Error", "Error al guardar la comunidad", "error")
        }

    }
}

export const borrarComunidad = (comunidad) => {
    return async (dispatch) => {
        try {

            const resp = await fetchConToken(`cmnd/${comunidad}`, comunidad, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Comunidad borrada correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })

                dispatch(borrandoComunidad(comunidad));
            } else {
                Swal.fire("Error", "Error al borrar la comunidad", "error")
            }

        } catch (error) {
            console.log("error al borrar la comunidad", error)
        }
    }
}

export const retornaCantonesxProvincia = (provincia) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`canton/${provincia}`);
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargarCantonesxProvincia(body.Registro));
        } else {
            Swal.fire("Error", "Error al cargar los cantones x provincia", "error")
        }
    }
}

export const retornaParroquiasxCanton = (canton) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`parroquia/${canton}`);
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargarParroquiasxCanton(body.Registro));
        } else {
            Swal.fire("Error", "Error al cargar las parroquias x canton", "error")
        }
    }
}

export const retornaComunidadesxParroquia = (parroquia) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`comunidad/${parroquia}`);
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargarComunidadesxParroquia(body.Registro));
        } else {
            Swal.fire("Error", "Error al cargar las comunidades x parroquia", "error")
        }
    }
}

// const baseUrl = process.env.REACT_APP_API_URL;

// export const clickclick = () => {
//     return async (dispatch) => {

//         const resp = await ft();
//         const body = await resp.json();

//         if(body.ok){
//             Swal.fire("OK", "Todo bien", "success")
//         }else{
//             Swal.fire("ERROR", "Todo mal", "error")
//         }

//     }

// }

// const ft = (method = 'GET') => {

//     const url = `${baseUrl}/login/saludo`
//     console.log("accesa al servidor de tedein", url )
//     return fetch(url, {
//         method,       
//     })
// }


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

export const nuevoCanton = () => {
    return {
        type: tipos.geoNuevoCanton
    }
}

const borrandoCanton = (id) => {
    return {
        type: tipos.geoBorrarCanton,
        payload: id
    }
}

export const verCanton = (id) => {
    return {
        type: tipos.geoVerCanton,
        payload: id
    }
}

export const editarParroquia = (id) => {
    return {
        type: tipos.geoEditarParroquia,
        payload: id
    }
}

export const nuevaParroquia = () => {
    return {
        type: tipos.geoNuevaParroquia
    }
}

export const verParroquia = (id) => {
    return {
        type: tipos.geoVerParroquia,
        payload: id
    }
}

const borrandoParroquia = (id) => {
    return {
        type: tipos.geoBorrarParroquia,
        payload: id
    }
}

export const editarComunidad = (id) => {
    return {
        type: tipos.geoEditarComunidad,
        payload: id
    }
}

export const nuevaComunidad = () => {
    return {
        type: tipos.geoNuevaComunidad
    }
}

export const verComunidad = (id) => {
    return {
        type: tipos.geoVerComunidad,
        payload: id
    }
}

const borrandoComunidad = (id) => {
    return {
        type: tipos.geoBorrarComunidad,
        payload: id
    }
}

const cargarCantonesxProvincia = (cantones) => {
    return {
        type: tipos.geoCantonesxProvincia,
        payload: cantones
    }
}

const cargarParroquiasxCanton = (parroquias) => {
    return {
        type: tipos.geoRetornaParroquiasxCanton,
        payload: parroquias
    }
}

const cargarComunidadesxParroquia = (comunidades) => {
    return {
        type: tipos.geoRetornaComunidadesxParroquia,
        payload: comunidades
    }
}

export const cargarProvinciaFinca = (provincia) => {
    return {
        type: tipos.geoCargarProvincia,
        payload: provincia
    }
}

export const cargarCantonFinca = (canton) => {
    return {
        type: tipos.geoCargarCanton,
        payload: canton
    }
}

export const cargarParroquiaFinca = (parroquia) => {
    return {
        type: tipos.geoCargarParroquia,
        payload: parroquia
    }
}

export const cargarComunidadFinca = (comunidad) => {
    return {
        type: tipos.geoCargarComunidad,
        payload: comunidad
    }
}