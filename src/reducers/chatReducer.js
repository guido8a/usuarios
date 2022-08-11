import { tipos } from "../tipos/tipos";

const estadoInicial = {
    chatRooms: [],
    modalChatOpen: false,
    usuarios: [],
    room: null
}

export const chatReducer = (estado = estadoInicial, accion) => {

    switch (accion.type) {
        case tipos.chtRetornaChats:
            return {
                ...estado,
                chatRooms: [...accion.payload]
            }
        case tipos.chtNuevoChat:
            return {
                ...estado,
                modalChatOpen: true
            }
        case tipos.chtCerrarModalChat:
            return {
                ...estado,
                modalChatOpen: false
            }
        case tipos.chtSeleccionarRoom:
            return {
                ...estado,
                room: estado.chatRooms.filter(
                    e => (e.id === accion.payload)
                )
            }
        default:
            return estado;
    }

}