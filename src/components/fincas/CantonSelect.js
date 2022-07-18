import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { retornaParroquiasxCanton } from '../../acciones/geografia';

export const CantonSelect = () => {

    const dispatch = useDispatch();

    const { cantonesxProvincia, provincias } = useSelector(state => state.geografia);
    const { finca} = useSelector(state => state.fincas);

    const [age2, setAge2] = React.useState('');

    React.useEffect(() => {  
        setAge2(finca ? finca.cntnid : '');             
        {finca && dispatch(retornaParroquiasxCanton(finca.cntnid)); }                       
    }, [dispatch, finca, provincias])

    const handleChangeCanton = (event) => {
        dispatch(retornaParroquiasxCanton(event.target.value));
        setAge2(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="cntnid-label">Cantón</InputLabel>

                <Select
                    labelId="cntnid-label"
                    id="cntnid"
                    value={age2}
                    onChange={handleChangeCanton}
                    autoWidth
                    label="Cantón"
                >
                    {
                        cantonesxProvincia.map((cantones) => (
                            <MenuItem key={cantones.id} value={cantones.id}>{cantones.nombre}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </div>
    );
}
