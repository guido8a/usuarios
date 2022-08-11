import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { tipos } from "../tipos/tipos"
import "../acciones/swalestilo.css"

export const retornaChatRooms = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('room');
            const body = await resp.json();

            if (body.ok) {
                dispatch(cargaChatRoms(body.Registro));
            } else {
                Swal.fire("Error", "Error al cargar los chat-room", "error");
            }

        } catch (error) {
            console.log("error al retonar los chats-rooms", error)
        }
    }
}

export const guardarRooms = (valores) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('room', valores, 'POST');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Chat Room creado correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(cerrarModalChat());
                dispatch(retornaChatRooms());
            } else {
                Swal.fire({
                    position: "center",
                    icon: 'error',
                    title: "Error",
                    html: "Error al guardar el chat room",
                    showConfirmButton: true,
                    customClass: {
                        container: 'my-swal'
                    }
                })
            }

        } catch (error) {
            console.log("Error al guardar el chat room", error);
        }
    }
}

export const guardarChat = (valores) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('chat', valores, 'POST');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Enviado',
                    showConfirmButton: false,
                    timer: 1000
                })
                // dispatch(cerrarModalChat());
                // dispatch(retornaChatRooms());
            } else {
                Swal.fire({
                    position: "center",
                    icon: 'error',
                    title: "Error",
                    html: "Error al enviar el mensaje",
                    showConfirmButton: true,
                    customClass: {
                        container: 'my-swal'
                    }
                })
            }

        } catch (error) {
            console.log("Error al guardar el chat", error);
        }
    }
}

const cargaChatRoms = (chatRoms) => {
    return {
        type: tipos.chtRetornaChats,
        payload: chatRoms
    }
}

export const nuevoChat = () => {
    return {
        type: tipos.chtNuevoChat
    }
}

export const cerrarModalChat = () => {
    return {
        type: tipos.chtCerrarModalChat
    }
}

export const seleccionaRoom = (id) => {
    return {
        type: tipos.chtSeleccionarRoom,
        payload: id
    }
}