import React from 'react'
import TablaUsuarios from '../ui/TablaUsuarios'
import { Navbar } from './Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';


const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

export const Usuarios = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <TablaUsuarios />
      </ThemeProvider>
    </div>
  )
}



