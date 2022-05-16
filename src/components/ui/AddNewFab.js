import React from 'react'
import { useDispatch } from 'react-redux'
import { accion_abrirModal } from '../../acciones/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClic = () => {
        dispatch( accion_abrirModal() )
    } 

  return (
    <button className='btn btn-primary fab'
        onClick= { handleClic }
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
