import { tipos } from '../tipos/tipos';


// const estadoInicial = {
//     eventos: [{
//         id: 11232,
//         title: 'Cumpleaños 1',
//         start: moment().toDate(),
//         end: moment().add(2, 'hours').toDate(),
//         bgcolor: '#dadada',
//         nota: 'Prepara el evento', //atributo añadido
//         usuario: {
//           id: '123',
//           nombre: 'Guido'
//         }
//     }],
//     eventoActivo: null
// }

const estadoInicial = {
    eventos: [],
    eventoActivo: null
}


export const calReducer = ( estado = estadoInicial, accion) => {
    switch (accion.type) {
        case tipos.eventoActivo:
            return {
                ...estado,
                eventoActivo: accion.payload
            }
        case tipos.eventoNuevoEvento:
            return {
                ...estado,
                eventos: [
                    ...estado.eventos,
                    accion.payload
                ]
            }
        case tipos.enceraEventoActivo:
            return {
                ...estado,
                eventoActivo: null 
            }
        case tipos.actualizaEvento: //en realizada es post update
            return {
                ...estado,
                eventos: estado.eventos.map(
                    e => (e.id === accion.payload.id) ? accion.payload : e
                )
            }
        case tipos.borrarEvento: //post delete
            return {
                ...estado,
                eventos: estado.eventos.filter(
                    e => (e.id !== estado.eventoActivo.id)
                ),
                eventoActivo: null 
            }
        case tipos.cargarEvento: 
            return {
                ...estado,
                eventos: [ ...accion.payload ],
                eventoActivo: null 
            }
        case tipos.logoutEvento: 
            return {
                ...estadoInicial
            }
        default:
            return estado;
    }
}