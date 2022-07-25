import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"

export const retornaInstituciones = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('inst');
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargarInstituciones(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar las instituciones", "error");
            }

        } catch (error) {
            console.log("Error al retornar las instituciones", error)
        }
    }
}

export const guardarInstitucion = (valores, tipo) => {
    return async (dispatch) => {

        let url
        let envio
        let mensaje

        if (tipo === -1) {
            url = 'inst'
            envio = 'POST'
            mensaje = 'guardada'
        } else {
            url = `inst/${valores?.id}`
            envio = 'PUT'
            mensaje = 'actualizada'
        }

        try {
            const resp = await fetchConToken(url, valores, envio);
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Institución ${mensaje} correctamente`,
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(cerrarModalInstitucion());
                dispatch(retornaInstituciones());
            } else {
                Swal.fire("Error", `Error al ${mensaje} la institución`)
            }
        } catch (error) {
            console.log("error al guardar la institucion", error)
        }
    }
}

export const borrarInstitucion = (institucion) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`inst/${institucion}`, institucion, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Institución borrada correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(borrandoInstitucion(institucion));
                dispatch(noSeleccionaInstitucion());
            }else{
                Swal.fire("Error", "Error al borrar la institución" ,"error")
            }

        } catch (error) {
            console.log("error al borrar la institucion", error)
        }
    }
}

const cargarInstituciones = (instituciones) => {
    return {
        type: tipos.insRetornaInstituciones,
        payload: instituciones
    }
}

export const seleccionarInstitucion = (institucion) => {
    return {
        type: tipos.insSeleccionaInstitucion,
        payload: institucion
    }
}

export const noSeleccionaInstitucion = () => {
    return {
        type: tipos.insNoSeleccionaInstitucion
    }
}

export const editarInstitucion = (institucion) => {
    return {
        type: tipos.insEditarInstitucion,
        payload: institucion
    }
}

export const nuevaInstitucion = () => {
    return {
        type: tipos.insNuevaInstitucion
    }
}

export const cerrarModalInstitucion = () => {
    return {
        type: tipos.insCerraModalInstitucion
    }
}

const borrandoInstitucion = (institucion) => {
    return {
        type: tipos.insBorrarInstitucion,
        payload: institucion
    }
}