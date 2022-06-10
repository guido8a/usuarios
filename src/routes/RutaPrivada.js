import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RutaPrivada = ( { children } ) => {
    const { uid } = useSelector( state => state.auth );
    const ruta = useLocation();
    // se desestructura pathname y search
    const { pathname, search } = useLocation();
    localStorage.setItem('ultimaRuta', pathname + search)
    // console.log('Ruta:', ruta, pathname, search)
    
  return uid ?
    children
    : <Navigate to='/login'/>
}
