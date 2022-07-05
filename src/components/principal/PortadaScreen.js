// import React, { useState, useEffect } from 'react'
import { Navbar } from '../ui/Navbar'
import { momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { CalendarioEvento } from './CalendarioEvento'
import { RutaModal } from './RutaModal'
import '../../estilos.css'
import { useDispatch, useSelector } from 'react-redux'
import { accion_abrirModal } from '../../acciones/ui'
// import { accion_eventoActivo, accion_lipiarActiva, iniciaCargaEventos } from '../../acciones/evento'
import { AddNewFab } from '../ui/AddNewFab'
import { BorraEventoFab } from '../ui/BorraEventoFab'
import '../../estilos.css'
// import { Topic } from '@mui/icons-material'

moment.locale('es')

// const localizer = momentLocalizer(moment)

export const PortadaScreen = () => {

  const dispatch = useDispatch();

  //leer los eventos desde el store
  // const { uid } = useSelector(state => state.auth);
  // console.log('Eventos:', eventos)

  //se llama a iniciaCargaEventos
  // useEffect(() => {
  //   dispatch(iniciaCargaEventos())
  // }, [dispatch])

  //manejo de eventos de ratón sobre el calendario
  const onDobleClic = (e) => {
    dispatch(accion_abrirModal())
  }
  //clic
  // const onSeleccionaEvento = (e) => {
  //   dispatch(accion_eventoActivo(e))
  // }

  // const handleSelectSlot = (e) => {
  //   // console.log('select slot:', e)
  //   dispatch(accion_lipiarActiva())
  // }

  return (
    <div>
      <Navbar />

      <div className='container' style={{marginTop:'40px'}}>
        <div className="row color1" onClick={onDobleClic}>
          <div className="col-md-9">
            <h3>Gestión de Proyectos</h3>
            Definir e implementar directrices e instrumentos para la gestión integral de proyectos en la
            empresa
          </div>
          <div className="col-md-3">
            <img alt="Remy Sharp" src="/assets/images/composta.jpeg" width="240px" />
          </div>
        </div>
        <div className="row color2">
          <div className="col-md-9">
            <h3>Gestión de Proyectos</h3>
            Definir e implementar directrices e instrumentos para la gestión integral de proyectos en la
            empresa
          </div>
          <div className="col-md-3">
            <img alt="Remy Sharp" src="/assets/images/productos.jpeg" width="240px" />
          </div>
        </div>
        <div className="row color1">
          <div className="col-md-9">
            <h3>Gestión de Proyectos</h3>
            Definir e implementar directrices e instrumentos para la gestión integral de proyectos en la
            empresa
          </div>
          <div className="col-md-3">
            <img alt="Remy Sharp" src="/assets/images/mercado.png" width="240px" />
          </div>
        </div>
      </div>
      
      < AddNewFab /> 
      {/*{ eventoActivo && < BorraEventoFab /> }*/}
      {< BorraEventoFab />}

      <RutaModal />
    </div>
  )
}