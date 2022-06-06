import React from 'react';
import { useForma } from '../../hooks/usaForma';
// import '../ui/ingreso.css';
import { useSelector, useDispatch } from 'react-redux';
import { iniciaLogin, iniciaUsuario } from '../../acciones/auth';
import Swal from 'sweetalert2';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddNewFab } from '../ui/AddNewFab';
import { PerfilModal } from './PerfilModal';
import { accion_abrirModal } from '../../acciones/ui';
import { accion_cargaPerfil } from '../../acciones/menu';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const theme = createTheme();
 

  //usaForma para login con un usuario existente
  const [loginValores, loginManejaCambios] = useForma({
    login: "admin",
    pass: '123'
  })
  const { login, pass } = loginValores

  const handleLogin = (e) => {
    e.preventDefault()
    // const ok = dispatch(iniciaLogin(login, pass))
    const ok = dispatch(iniciaUsuario(login, pass))
    ok.then( (val) => {
      console.log('retorna:', val)
      if( val ) {
        dispatch(accion_cargaPerfil(val))
        dispatch( accion_abrirModal() ) 
      }  
    })
  }


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://www.tedein.com.ec/">
          Tedein
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingreso
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Usuario"
                name="login"
                autoComplete='off'
                autoFocus
                value={login}
                onChange={loginManejaCambios}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="pass"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="off"
                value={pass}
                onChange={loginManejaCambios}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    <PerfilModal/>
    </>
  )
}
