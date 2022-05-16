import React from 'react'
import { useDispatch } from 'react-redux'
import { accion_bd_borrarEvento } from '../../acciones/evento';

export const BorraEventoFab = () => {
    const dispatch = useDispatch();

    const handleClic = () => {
        dispatch( accion_bd_borrarEvento() )
    }
  return (
    <button className='btn btn-danger fab-danger'
        onClick= { handleClic }
    >
        <i className='fas fa-trash'></i>
        <span>Borrar Evento</span>
    </button>
  )
}
