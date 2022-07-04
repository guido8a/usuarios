import { tipos } from "../tipos/tipos";

const estadoInicial = {
    provincias: []
}

switch (estado = estadoInicial, accion) {
    case tipos.geoRetornarProvincias:
        return {
            ...estado,
            provincias: [...accion.payload]
        }
    default:
        return estado;
}