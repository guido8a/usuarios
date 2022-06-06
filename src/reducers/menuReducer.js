import { string } from "yup/lib/locale";
import { tipos } from "../tipos/tipos";

const estadoInicial = {
    menus: [],
    perfiles: [],
    perfil: "",
    cargandoMenu: true,
    cargandoPrfl: true
}

export const menuReducer = (estado = estadoInicial, accion) => {
    console.log('menu reducer -> accion-tipo:', accion.type, accion.payload)
    switch (accion.type) {
        case tipos.menuCargar:
            console.log('pone menú', [ ...accion.payload ])
            return {
                ...estado,
                menus: [ ...accion.payload ],
                cargandoMenu: false
            }

        case tipos.perfilCargar:
            return {
                ...estado,
                perfiles: [ ...accion.payload ],
                cargandoPrfl: false
            }

        default:
            return estado;
    }
}