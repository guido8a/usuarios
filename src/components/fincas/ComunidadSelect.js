import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { seleccionarComunidad } from '../../acciones/fincas';
import { FormHelperText } from '@mui/material';

export const ComunidadSelect = () => {

    // console.log("props ", props)

    const dispatch = useDispatch();

    const { comunidadesxParroquia, parroquiasxCanton } = useSelector(state => state.geografia);
    const { finca } = useSelector(state => state.fincas);

    const [age4, setAge4] = React.useState('');

    React.useEffect(() => {
        setAge4(finca ? finca.comunidadid : '');
        dispatch(seleccionarComunidad(finca ? finca.comunidadid : null));
        // }, [finca, parroquiasxCanton])
    }, [])

    const handleChangeComunidad = (event) => {
        dispatch(seleccionarComunidad(event.target.value));
        setAge4(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="comunidadid-label">Comunidad</InputLabel>
                <Select
                    labelId="comunidadid-label"
                    id="comunidadid"
                    name="comunidadid"
                    value={age4}
                    onChange={handleChangeComunidad}
                    autoWidth
                    label="Comunidad"
                    required
                >
                    {
                        comunidadesxParroquia.map((comunidad) => (
                            <MenuItem key={comunidad.id} value={comunidad.id} >{comunidad.nombre}</MenuItem>
                        ))
                    }

                </Select>
                {age4 === '' && <FormHelperText>Comunidad es obligatoria!</FormHelperText>}
            </FormControl>
        </div>
    );
}
