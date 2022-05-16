import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { iniciaLogout } from '../../acciones/auth';

export const Navbar = () => {
  const { nombre } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(iniciaLogout())
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            { nombre }
        </span>
        <button className='btn btn-outline-danger'
          onClick={ handleLogout }  
        >
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
        </button>

    </div>
  )
}
