import React from 'react'
import { Navbar } from '../ui/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { TablaPerfiles } from './TablaPerfiles';


const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

export const Perfiles = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <TablaPerfiles />
      </ThemeProvider>
    </div>
  )
}

