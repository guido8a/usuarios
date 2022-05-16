import React, { useState, useEffect} from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/cal-mesages-es'
import { CalendarioEvento } from './CalendarioEvento'
import { CalModal } from './CalModal'
import '../../estilos.css'
import { useDispatch, useSelector } from 'react-redux'
import { accion_abrirModal } from '../../acciones/ui'
import { accion_eventoActivo, accion_lipiarActiva, iniciaCargaEventos } from '../../acciones/evento'
import { AddNewFab } from '../../components/ui/AddNewFab'
import { BorraEventoFab } from '../ui/BorraEventoFab'

moment.locale('es')

const localizer = momentLocalizer(moment)
/* const eventos = [{
     title: 'Cumpleaños 1',
     start: moment().toDate(),
     end: moment().add(2, 'hours').toDate(),
     bgcolor: '#dadada',
     nota: 'Prepara el evento', //atributo añadido
     usuario: {
       id: '123',
       nombre: 'Guido'
     }
},{
  title: 'Cumpleaños 2',
     start: moment().add(3, 'hours').toDate(),
     end: moment().add(4, 'hours').toDate(),
     bgcolor: '#dadada',
     nota: 'Preparar el evento', //atributo añadido
     usuario: {
       id: '12333',
       nombre: 'Guido'
     }
}
]*/

export const CalendarioScreen = () => {

      const dispatch = useDispatch();

      //leer los eventos desde el store
      const { eventos, eventoActivo } = useSelector( state => state.cal );
      const { uid } = useSelector( state => state.auth );
      // console.log('Eventos:', eventos)

      const [ultimaVista, setUltimaVista] = useState(
          localStorage.getItem('ultimaVista') || 'month') //si no hay se pone mes
      
      const eventoEstilo = (event) => {
        const style = {
          backgroundColor: (uid === event.usuario._id)? '#067cf7' : '#aaaaaa',
          borderRadius: '2px',
          opacity: 0.8,
          display: 'block',
          color: 'white'
        }
        // console.log(event)
        return { style }
      }

      //se llama a iniciaCargaEventos
      useEffect(() => {
          dispatch( iniciaCargaEventos() )
      }, [dispatch])

    //manejo de eventos de ratón sobre el calendario
    const onDobleClic = (e) => {
      // console.log('dobleclic', e)
      dispatch(accion_abrirModal())
    }
    //clic
    const onSeleccionaEvento = (e) => {
      // console.log(e)
      dispatch( accion_eventoActivo( e ) )
    }
    //se sabe si seleccioina mes, semana, día o evento
    const onVerEvento = (e) => {
      // console.log(e)
      setUltimaVista(e)
      localStorage.setItem('ultimaVista', e)
    }

    const handleSelectSlot = (e) => {
      // console.log('select slot:', e)
      dispatch( accion_lipiarActiva())
    }

  return (
    <div>
        <Navbar/>
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          messages={ messages }
          style={{ height: 600 }}
          eventPropGetter={ eventoEstilo }
          onDoubleClickEvent={onDobleClic}
          onSelectEvent={onSeleccionaEvento}
          onView={onVerEvento}
          view={ultimaVista}
          onSelectSlot={ handleSelectSlot }
          selectable={true}
          components={ { 
            event: CalendarioEvento
          } }
        />

        < AddNewFab />
        { eventoActivo && < BorraEventoFab /> }
        
        <CalModal/>
    </div>
  )
}