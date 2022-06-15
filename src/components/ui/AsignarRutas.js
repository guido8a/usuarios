import { Navbar } from './Navbar'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { iniciaCargaPerfiles, iniciaCargaPermisos, perfilSeleccionado } from '../../acciones/perfiles';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';
import { TablaRutas } from './TablaRutas';
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

export const AsignarRutas = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(iniciaCargaPerfiles());
    }, [dispatch])

    const [prfl, setPrfl] = React.useState('');
    const { todos, perfil, modulo } = useSelector(state => state.perfiles);

    const handleChange = (event) => {
        setPrfl(event.target.value);
        dispatch(perfilSeleccionado(event.target.value));
        dispatch(iniciaCargaPermisos(event.target.value))
    };

    return (
        <div>
            <Navbar />

            <Stack sx={{ width: '100%', alignItems: 'center', mt: 5 }} spacing={2}>
                {prfl ? <Alert severity="success">Perfil Seleccionado!</Alert> : <Alert severity="info">Seleccione un perfil</Alert>}
            </Stack>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}>
                <FormControl sx={{ mt: 3, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Perfiles</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={prfl}
                        label="Perfiles"
                        onChange={handleChange}
                        autoWidth
                    >
                        {todos.map((perfil) => (
                            <MenuItem key={perfil.id} value={perfil.id}>
                                {perfil.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <ThemeProvider theme={theme}>
                    <TablaRutas perfil={prfl} />
                </ThemeProvider>
            </Box>
        </div>
    )
}
