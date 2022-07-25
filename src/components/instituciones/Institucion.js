import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import Box from '@mui/material/Box';
import { TablaInstitucion } from './TablaInstitucion';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

export const Institucion = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}>
          <TablaInstitucion />
        </Box>
      </ThemeProvider>
    </div>
  )
}



