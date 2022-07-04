import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { inicioGuardadoPermisos } from '../../acciones/perfiles'
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';

export const ToolBarPermisos = (props) => {
    const { numSelected, permisos, seleccionados, existentes, modulo, perfil } = props;

    const dispatch = useDispatch();

    // console.log("seleccionados", seleccionados, "existentes", existentes)

    // let arregloFiltrado = []
    let arregloStrings = ''

    const handleGuardar = () => {

        seleccionados.map((item, index) => {
            // return {
                if(item) {
                    addItem(index)
                }
            // }
        })

        const data = ({
            ids: arregloStrings
        })

        // console.log("filtrado ", arregloFiltrado, "strings ", arregloStrings, "modulo ", modulo, "perfil ", perfil)
          console.log("data", data)
        dispatch(inicioGuardadoPermisos(data, perfil, modulo));

        arregloStrings = ''
    }

    const addItem = (i) => {
        // console.log("index ", i)
        existentes.map((item, index) => {
            // index === i && (arregloFiltrado = arregloFiltrado.concat(item))
            index === i && (arregloStrings = ((arregloStrings !== '' ? (arregloStrings + ",") : '') + `${item}`))
        })
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Permisos
            </Typography>

            {permisos !== 0 ?
                (<Tooltip title="Guardar">
                    <IconButton color='success' onClick={handleGuardar}>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>)
                : ''}

        </Toolbar>
    );
};