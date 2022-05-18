import React from 'react';
import { useForma } from '../../hooks/usaForma';
// import './registro.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { iniciaRegistro } from '../../acciones/auth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navbar } from '../ui/Navbar';


export const RegistroScreen = () => {

  const dispatch = useDispatch();

  const theme = createTheme();

  //usaForma para el registro
  const [registroValores, registroManejaCambios] = useForma({
    reg_Nombre: "Guido",
    reg_Mail: "guido@gmail.com",
    reg_Pass1: '123456',
    reg_Pass2: '123456'
  })

  const { reg_Nombre, reg_Mail, reg_Pass1, reg_Pass2 } = registroValores

  const handleRegistro = (e) => {
    e.preventDefault()
    if (reg_Pass1 !== reg_Pass2) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
    }
    dispatch(iniciaRegistro(reg_Nombre, reg_Mail, reg_Pass1))
  }

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro de usuarios
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegistro} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="nombre"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    name="apellido"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="cedula"
                    label="Cédula"
                    name="cedula"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="mail"
                    label="Email"
                    name="mail"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via mail."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Guardar
              </Button>
              {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      </div>
    //     <div className="col-md-6 login-form-2">
    //     <h3>Registro</h3>
    //     <form onSubmit={handleRegistro}>
    //         <div className="form-group">
    //             <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Nombre"
    //                 name="reg_Nombre"
    //                 value={reg_Nombre}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>
    //         <div className="form-group">
    //             <input
    //                 type="mail"
    //                 className="form-control"
    //                 placeholder="Correo"
    //                 name="reg_Mail"
    //                 value={reg_Mail}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>
    //         <div className="form-group">
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Contraseña"
    //                 name="reg_Pass1"
    //                 value={reg_Pass1}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>

    //         <div className="form-group">
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Repita la contraseña"
    //                 name="reg_Pass2"
    //                 value={reg_Pass2}
    //                 onChange={registroManejaCambios}
    //             />
    //         </div>

    //         <div className="form-group">
    //             <input
    //                 type="submit"
    //                 className="btnSubmit"
    //                 value="Crear cuenta" />
    //         </div>
    //     </form>
    // </div>
  )

}