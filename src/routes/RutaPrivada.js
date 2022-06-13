import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RutaPrivada = ( { children } ) => {
    const { uid } = useSelector( state => state.auth );
    const ruta = useLocation();
    // se desestructura pathname y search
    const { pathname, search } = useLocation();
    localStorage.setItem('ultimaRuta', pathname + search)
<<<<<<< HEAD
    console.log('Ruta:', ruta, pathname, search)

    /* ***************************************************************
    todo: validar pathname contra rutas permitidas para el perfil 
    **************************************************************** */

=======
    // console.log('Ruta:', ruta, pathname, search)
    
>>>>>>> f8ec2a52467d54361dad5b813ba791582ce748fd
  return uid ?
    children
    : <Navigate to='/login'/>
}
