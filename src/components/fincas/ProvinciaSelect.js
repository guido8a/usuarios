import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { retornaCantonesxProvincia, retornaProvincias } from '../../acciones/geografia';

export const ProvinciaSelect = () => {

    const dispatch = useDispatch();

    const { provincias } = useSelector(state => state.geografia);
    const { finca } = useSelector(state => state.fincas);

    const [age, setAge] = React.useState('');

    React.useEffect(() => {
        
        dispatch(retornaProvincias());
        {finca &&  dispatch(retornaCantonesxProvincia(finca.provid));}       
        setAge(finca ? finca.provid : '');
       
    }, [dispatch, finca])


    const handleChange = (event) => {
        dispatch(retornaCantonesxProvincia(event.target.value));
        setAge(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="provid-label">Provincia</InputLabel>
                 <Select
                    labelId="provid-label"
                    id="provid"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="Provincia"
                >
                    {
                        provincias.map((provincia) => (
                            <MenuItem key={provincia.id} value={provincia.id}>{provincia.nombre}</MenuItem>
                        ))
                    }

                </Select> 
            </FormControl>
        </div>
    );
}
