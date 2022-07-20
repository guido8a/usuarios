import { tipos } from "../tipos/tipos";

const estadoInicial = {
    organizaciones: [],
    organizacion: null,
    modalOrgOpen: false,
    seleccionado: false,
    tipo: -1
}

export const orgReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.orgRetornaOrganizaciones:
            return {
                ...estado,
                organizaciones: [...accion.payload]
            }
        case tipos.orgSeleccionaOrganizacion:
            return {
                ...estado,
                seleccionado: true,
                organizacion: estado.organizaciones.filter(
                    e => (e.id === accion.payload)
                )
            }
        case tipos.orgNoSeleccionarOrganizacion:
            return {
                ...estado,
                organizacion: null,
                seleccionado: false
            }
        case tipos.orgEditarOrganizacion:
            return {
                ...estado,
                modalOrgOpen: true,
                tipo: 1
            }
        case tipos.orgCerrarModalOrganizacion:
            return {
                ...estado,
                modalOrgOpen: false
            }
        case tipos.orgNuevaOrganizacion:
            return {
                ...estado,
                modalOrgOpen: true,
                tipo: -1
            }
        case tipos.orgBorrarOrganizacion:
            return{
                ...estado,
                organizacion: null,
                seleccionado: false
            }    

        default:
            return estado;
    }
}