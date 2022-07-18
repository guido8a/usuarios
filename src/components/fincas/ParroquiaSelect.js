import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { retornaComunidadesxParroquia } from '../../acciones/geografia';

export const ParroquiaSelect = () => {

    const dispatch = useDispatch();

    const { parroquiasxCanton, cantonesxProvincia } = useSelector(state => state.geografia);
    const { finca } = useSelector(state => state.fincas);

    const [age3, setAge3] = React.useState('');

    React.useEffect(() => {  
        setTimeout(() => {
             { finca && dispatch(retornaComunidadesxParroquia(finca.parrid)); }
        }, 500);                  
        setAge3(finca ? finca.parrid : '');                
    }, [dispatch, finca])
    // }, [dispatch, finca, cantonesxProvincia])

    const handleChangeParroquia = (event) => {
        dispatch(retornaComunidadesxParroquia(event.target.value));
        setAge3(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="parrid-label">Parroquia</InputLabel>             

                <Select
                    labelId="parrid-label"
                    id="parrid"
                    value={age3}
                    onChange={handleChangeParroquia}
                    autoWidth
                    label="Parroquia"                    
                >
                    {
                        parroquiasxCanton.map((parroquia) => (
                            <MenuItem key={parroquia.id} value={parroquia.id}>{parroquia.nombre}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </div>
    );
}
