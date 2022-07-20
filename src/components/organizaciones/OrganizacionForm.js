
import { withFormik } from "formik";
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux'
import { guardarOrganizacion } from "../../acciones/organizacion";
import { validacionOrganizacion } from "../../helpers/validacionOrganizacion";

const form = props => {

    const theme = createTheme();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        tipo
    } = props;

    return (
        <div >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField
                                        id="nombre"
                                        label="Nombre"
                                        value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.nombre ? errors.nombre : ""}
                                        error={touched.nombre && Boolean(errors.nombre)}
                                        inputProps={{ style: { textTransform: 'capitalize' } }}
                                        autoComplete="off"
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                            </Grid>

                            <Button type="submit" color='success' fullWidth variant="contained"
                                sx={{ mt: 1 }} startIcon={<FontAwesomeIcon icon={faSave} />}
                            >
                                {tipo === -1 ? 'Guardar' : 'Actualizar'}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div >
    );
};

const Organizacion = withFormik({

    enableReinitialize: true,

    mapPropsToValues: (props) => ({
        id: props.initialValues ? props.initialValues[0]?.id : null,
        nombre: props.initialValues ? props.initialValues[0]?.nombre : "",
    }),

    validationSchema: validacionOrganizacion,

    handleSubmit: (values, { props, setSubmitting }) => {
        values.nombre = values.nombre.trim().replace(/^\w/, (c) => c.toUpperCase());
        props.registroDeOrganizacion(values, props.tipo);
        setSubmitting(false);
    }
})(form);

//función para enviar un state del selector a las props
const mapStateToProps = (
    state
) => ({
    initialValues: state.organizacion.organizacion,
    tipo: state.organizacion.tipo,
})

//función para usar un dispatch mediante props
const mapDispatchToProps = (dispatch) => ({
    registroDeOrganizacion: (values, tipo) => {
        dispatch(guardarOrganizacion(values, tipo))
    }
})

export const OrganizacionForm = connect(mapStateToProps, mapDispatchToProps)(Organizacion)