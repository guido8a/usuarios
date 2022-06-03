import { tipos } from '../tipos/tipos'


export const accion_abrirModal = () => ({
    type: tipos.uiAbrirModal
})

export const accion_cerrarModal = () => ({
    type: tipos.uiCerrarModal
})

export const abrirModalRegistro = (tipo) => ({
    type: tipos.uiAbrirModalRegistro,
    payload: tipo 
})

export const accion_nuevoUsuario = () => {
    return{
        type: tipos.uiNuevoUsuario
    }
}

export const accion_editarUsuario = (id) => {
    return{
        type: tipos.uiEditarUsuario,
        payload: id
    }
}