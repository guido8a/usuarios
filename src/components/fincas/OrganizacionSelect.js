import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { retornaOrganizaciones } from '../../acciones/organizacion';
import { useField, useFormikContext } from 'formik';

export const OrganizacionSelect = ({ ...props }) => {

    const dispatch = useDispatch();

    // const { finca } = useSelector(state => state.fincas);

    const [age, setAge] = React.useState('');

    const [field] = useField(props);

    // console.log("field", field)
    // console.log("props", props)

    const { setFieldValue } = useFormikContext();

    React.useEffect(() => {
        dispatch(retornaOrganizaciones());
        // setAge(field.value.organizacionid || 9999);
        setAge(field.value || 9999);
    }, [dispatch])

    const { organizaciones } = useSelector(state => state.organizacion);

    const handleChange = (event) => {
        setAge(event.target.value);
        setFieldValue("organizacionid", event.target.value)
    };

    return (
        <div>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="organizacionid-label">Organizaciones</InputLabel>
                <Select
                    labelId="organizacionid-label"
                    id="organizacionid"
                    name="organizacionid"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="Organización"
                >
                    {
                        organizaciones.map((organizacion) => (
                            <MenuItem key={organizacion.id} value={organizacion.id}>{organizacion.nombre}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </div>
    );
}
