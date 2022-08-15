import { tipos } from "../tipos/tipos";

const estadoInicial = {
    chatRooms: [],
    modalChatOpen: false,
    usuarios: [],
    room: null,
    chats: []
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
        case tipos.chtRetornaChatsxRoom:
            return{
                ...estado,
                chats: [...accion.payload]
            }
        case tipos.chtLimpiaChats:
            return{
                ...estado,
                chats: []
            }        
        default:
            return estado;
    }

}