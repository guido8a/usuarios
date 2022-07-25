import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos";

export const retornaOrganizaciones = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('orga');
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargarOrganizaciones(body.Registro));
        } else {
            Swal.fire("Error", "Error al retornar las organizaciones", "error")
        }
    }
}

export const guardarOrganizacion = (valores, tipo) => {
    return async (dispatch) => {

        let url
        let envio
        let mensaje

        if (tipo === -1) {
            url = 'orga'
            envio = 'POST'
            mensaje = 'Organización guardada correctamente'
        } else {
            url = `orga/${valores?.id}`
            envio = 'PUT'
            mensaje = 'Organización actualizada correctamente'
        }

        try {
            const resp = await fetchConToken(url, valores, envio);
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 2000
                })

                dispatch(cerrarModalOrganizacion());
                dispatch(retornaOrganizaciones());
            } else {
                Swal.fire("Error al guardar la organización")
            }

        } catch (error) {
            console.log("Error al guardar la organizacion", error)
        }
    }
}

export const borrarOrganizacion = (organizacion) => {
    return async (dispatch) => {

        try{
            const resp = await fetchConToken(`orga/${organizacion}`, organizacion, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Organización borrada correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(borrandoOrganizacion());
                dispatch(noSeleccionaOrganizacion());
                // dispatch(retornaOrganizaciones());
            }else{
                   Swal.fire("Error","Error al borrar la organización","error") 
            }

        } catch (error) {
            console.log("Error al borrar la organizacion", "error")
        }
    }
}

const cargarOrganizaciones = (organizaciones) => {
    return {
        type: tipos.orgRetornaOrganizaciones,
        payload: organizaciones
    }
}

export const seleccionarOrganizacion = (organizacion) => {
    return {
        type: tipos.orgSeleccionaOrganizacion,
        payload: organizacion
    }
}

export const noSeleccionaOrganizacion = () => {
    return {
        type: tipos.orgNoSeleccionarOrganizacion
    }
}

export const editarOrganizacion = (organizacion) => {
    return {
        type: tipos.orgEditarOrganizacion,
        payload: organizacion 
    }
}

export const cerrarModalOrganizacion = () => {
    return {
        type: tipos.orgCerrarModalOrganizacion
    }
}

export const nuevaOrganizacion = () => {
    return {
        type: tipos.orgNuevaOrganizacion
    }
}

const borrandoOrganizacion = () => {
    return {
        type: tipos.orgBorrarOrganizacion
    }
}