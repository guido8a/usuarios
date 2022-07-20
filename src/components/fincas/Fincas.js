import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { TablaFincas } from './TablaFincas';


const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

export const Fincas = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>        
        <TablaFincas />
      </ThemeProvider>
    </div>
  )
}



