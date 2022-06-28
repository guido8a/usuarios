import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { accion_cargaModulos } from '../../acciones/modulo';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuIcon from '@mui/icons-material/Menu';
import { RutasxPerfil } from './RutasxPerfil';
import { iniciaCargaPermisos, moduloSeleccionado } from '../../acciones/perfiles';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';

export const TablaRutas = (prfl) => {

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const { modulos } = useSelector(state => state.mdlo);
  const { rutas } = useSelector(state => state.mdlo);
  const { modulo, perfil, permisos } = useSelector(state => state.perfiles)

  // obtiene módulos
  useEffect(() => {
    dispatch(accion_cargaModulos())
  }, [dispatch])

  //selecciona el módulo
  const handleClic = (val) => {
    // dispatch(accion_cargaRutas(val))
    dispatch(moduloSeleccionado(val));
    dispatch(iniciaCargaPermisos(perfil))
  };
  return (
    <>
      <div>
        <Stack sx={{ width: '100%', alignItems: 'center', mt: 3 }} spacing={2}>
          {modulo ? <Alert severity="success">Módulo Seleccionado!</Alert> : <Alert severity="info">Seleccione un módulo</Alert>}
        </Stack>

        <BottomNavigation showLabels value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleClic(newValue)
          }}
          sx={{ width: 500, mt: 2 }}
        >
          {modulos.map((mdlo) => (
            <BottomNavigationAction key={mdlo.id} label={mdlo.nombre} value={mdlo.id}
              sx={{ backgroundColor: '#FAFAFA' }}
              icon={<MenuIcon />}
            />
          ))}
        </BottomNavigation>
      </div >
      <RutasxPerfil />
    </>
  )
}