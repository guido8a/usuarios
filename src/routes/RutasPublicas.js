import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RutasPublicas = ({ children }) => {
  const { uid } = useSelector( state => state.auth );
  console.log('children', children)

  return uid
    ? <Navigate to="/"/>
    : children
}
