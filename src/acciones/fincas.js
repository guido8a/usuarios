import moment from "moment";
import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"

export const retornaFincas = () => {

    return async (dispatch) => {       
        try {
            const resp = await fetchConToken('finca');
            const body = await resp.json();
    
            if(body.ok){                  
                  const fincas = arregloDatosFincas(body.Registro) 
                  dispatch(cargarFincas(fincas)); 
            }else{
                 Swal.fire("Error", "Error al cargar las fincas", "error");   
            }  
        } catch (error) {
            console.log("error al retornar las fincas", error)
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