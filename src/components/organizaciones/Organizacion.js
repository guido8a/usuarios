import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { TablaOrganizacion } from './TablaOrganizacion';
import Box from '@mui/material/Box';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

export const Organizacion = () => {
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
          <TablaOrganizacion />
        </Box>
      </ThemeProvider>
    </div>
  )
}



