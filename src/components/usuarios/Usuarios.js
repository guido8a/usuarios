import React from 'react'
import { Navbar } from '../ui/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { TablaUsuarios } from './TablaUsuarios';


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



