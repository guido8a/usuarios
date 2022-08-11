import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useField, useFormikContext } from "formik";
import { retornaUsuarios } from '../../acciones/datos';

export const UsuarioSelect = ({...props}) => {

    const dispatch = useDispatch();

    const [age, setAge] = React.useState('');

    const [field, , { setValue }] = useField(props);

    const { setFieldValue } = useFormikContext();

    React.useEffect(() => {
        dispatch(retornaUsuarios());
        setAge(field.value || 1);
    }, [dispatch])

    const { usuarios } = useSelector(state => state.ui);

    const handleChange = (event) => {
        setAge(event.target.value);
        setFieldValue("responde", event.target.value)      
    };

    return (
        <div>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="responde-label">Responde</InputLabel>
                <Select
                    labelId="responde-label"
                    id="responde"
                    value={age}
                    onChange={handleChange}
                       autoWidth
                    label="Usuarios"
                >
                    {
                        usuarios.map((usuario) => (
                            <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}
