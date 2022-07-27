import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { retornaTiposOcupacion } from '../../acciones/fincas';
import { useField, useFormikContext } from "formik";

export const OcupacionSelect = ({...props}) => {

    const dispatch = useDispatch();

    // const { finca} = useSelector(state => state.fincas);

    const [age, setAge] = React.useState('');

    const [field, , { setValue }] = useField(props);

    const { setFieldValue } = useFormikContext();

    // console.log("value", field.value.tipoocupacionid)
    // console.log("field", field)

    React.useEffect(() => {
        dispatch(retornaTiposOcupacion());
        // setValue(field.value.tipoocupacionid || 1);
        setAge(field.value || 1);
    }, [dispatch])

    const { tiposOcupacion } = useSelector(state => state.fincas);

    const handleChange = (event) => {
        setAge(event.target.value);
        // setValue(event.target.value)  
        setFieldValue("tipoocupacionid", event.target.value)      
    };

    return (
        <div>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="tipoocupacionid-label">Tipo de Ocupación</InputLabel>
                <Select
                    labelId="tipoocupacionid-label"
                    id="tipoocupacionid"
                    value={age}
                    // value={field}
                    onChange={handleChange}
                    // onChange={(val) => {
                    //     setValue(val);                        
                    //   }}
                    autoWidth
                    label="Tipo de Ocupación"
                >
                    {
                        tiposOcupacion.map((ocupacion) => (
                            <MenuItem key={ocupacion.id} value={ocupacion.id}>{ocupacion.descripcion}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </div>
    );
}
