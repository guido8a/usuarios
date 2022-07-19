import moment from "moment";
import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"

export const retornaFincas = () => {

    return async (dispatch) => {
        try {
            const resp = await fetchConToken('fnca');
            const body = await resp.json();

            if (body.ok) {
                const fincas = arregloDatosFincas(body.Registro)
                dispatch(cargarFincas(fincas));
            } else {
                Swal.fire("Error", "Error al cargar las fincas", "error");
            }
        } catch (error) {
            console.log("error al retornar las fincas de la BD", error)
        }
    }
}

export const editarFinca = (finca, tipo) => {

    return async (dispatch) => {

        const resp = await fetchConToken(`fnca/${finca}`);
        const body = await resp.json();

        if (body.ok) {
            if (tipo === 0) {
                dispatch(visualizandoFinca(body.Registro));
            } else {
                dispatch(editandoFinca(body.Registro));
            }
        } else {
            Swal.fire("Error", "Error al cargar la finca", "error");
        }
    }
}

export const cargarFinca = (finca) => {
    return async (dispatch) => {

        const resp = await fetchConToken(`fnca/${finca}`);
        const body = await resp.json();

        if (body.ok) {
            dispatch(cargandoFinca(body.Registro));
        } else {
            Swal.fire("Error", "Error al cargar la finca", "error");
        }
    }
}


export const guardarFinca = (valores, tipo) => {
    return async (dispatch) => {
        let url
        let envio
        let mensaje

        if (tipo === -1) {
            url = 'fnca'
            envio = 'POST'
            mensaje = 'Finca creada correctamente'
        } else {
            url = `fnca/${valores?.id}`
            envio = 'PUT'
            mensaje = 'Finca actualizada correctamente'
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
                dispatch(retornaFincas());
                dispatch(cerrarModalFinca());
            } else {
                Swal.fire("Error", "Error al guardar la finca", "error")
            }

        } catch (error) {
            console.log("error al guardar la finca", error)
        }

    }
}

export const borrarFinca = (finca) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`fnca/${finca}`, finca, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Finca borrada correctamente",
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(retornaFincas());
                dispatch(fincaBorrada());
                setTimeout(() => {
                    dispatch(noFincaSeleccionada());
                }, 500);
            } else {
                Swal.fire("Error", "Error al borrar la finca", "error")
            }

        } catch (error) {
            console.log("error al borrar la finca", error)
        }
    }
}

const cargarFincas = (fincas) => {
    return {
        type: tipos.finRetornaFincas,
        payload: fincas
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

export const seleccionarFinca = (finca) => {
    return {
        type: tipos.finSeleccionarFinca,
        payload: finca
    }
}

export const noFincaSeleccionada = () => {
    return {
        type: tipos.finNoseleccionarFinca
    }
}

export const nuevaFinca = () => {
    return {
        type: tipos.finNuevaFinca
    }
}

export const cerrarModalFinca = () => {
    return {
        type: tipos.finCerrarModalFinca
    }
}

export const editandoFinca = (finca) => {
    return {
        type: tipos.finEditarFinca,
        payload: finca
    }
}

const fincaBorrada = () => {
    return {
        type: tipos.finBorrarFinca
    }
}

export const seleccionarComunidad = (comunidad) => {
    return {
        type: tipos.geoSeleccionaComunidad,
        payload: comunidad
    }
}

export const visualizandoFinca = (finca) => {
    return {
        type: tipos.finVerFinca,
        payload: finca
    }
}

export const cargandoFinca = (finca) => {
    return{
        type: tipos.finCargarFinca,
        payload: finca
    }
}



