import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { accion_cargaModulos, accion_cargaRutas } from '../../acciones/modulo';
import { RutasScreen } from './RutasScreen';
import { AddNewFab } from '../ui/AddNewFab'

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuIcon from '@mui/icons-material/Menu';
// const pages = ['una', 'dos']

export const ModulosScreen = () => {

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  // obtiene módulos
  useEffect(() => {
    dispatch(accion_cargaModulos())
  }, [dispatch])

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   console.log('valor:', newValue)
  //   setValue(newValue);
  // };
  const handleClic = (val) => {
    console.log('valor:', val)
    dispatch(accion_cargaRutas(val))
  };


  const handleRutas = (e) => {
    const mdlo__id = e.target.getAttribute('data-id')
    console.log('++modulo', mdlo__id)
    dispatch(accion_cargaRutas(mdlo__id))
  }

  const { modulos } = useSelector(state => state.mdlo);
  console.log('>>modulos:', modulos)

  const { rutas } = useSelector(state => state.mdlo);
  console.log('>>rutas:', rutas)

  return (
    <>
      <div>
        <h3>Módulos del Sistema</h3>

        {/* <Box sx={{ width: 600 }}> */}
          <BottomNavigation showLabels value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              handleClic(newValue)
            }}
            sx={{ width: 500 }}
          >
            {modulos.map((mdlo) => (
              <BottomNavigationAction label={mdlo.nombre} value={mdlo.id} key={mdlo.id}
                sx={{backgroundColor: '#FAFAFA'}} 
                icon={<MenuIcon/>}
              />
            ))}
          </BottomNavigation>
        {/* </Box> */}

      </div >
      <RutasScreen rutas={rutas} modulos={modulos} />
      <AddNewFab />
    </>
  )
}