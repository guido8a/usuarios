import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { faEdit, faTrashCan, faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { borrarOrganizacion, editarOrganizacion } from '../../acciones/organizacion';

export const ToolBarOrganizacion = (props) => {

    const { numSelected, nombres } = props;

    const {organizacion} = useSelector(state => state.organizacion)  
   
    const dispatch = useDispatch();

    let titulo = `Desea borrar la organizacion: ${nombres}?`

    const handleBorrar = () => {
        Swal.fire({
            title: titulo,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarOrganizacion(organizacion ? organizacion[0]?.id :  null));
            }
        })
    }

    const handleEditar = () => {
        dispatch(editarOrganizacion());
    }

    const [sel, setSel] = React.useState();

    React.useEffect(() => {
        setSel(organizacion ? organizacion[0]?.id :  null)
    }, [handleBorrar, handleEditar])
   
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

            {sel ? (
                <Typography
                    sx={{ flex: '1 1 80%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    <Chip color='primary' size="medium" label={nombres + ' seleccionado'} />

                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                    align='center'
                >
                    Lista de Organizaciones
                </Typography>
            )}
            {sel ? (
                <Grid item xs={1} sm={2}>
                    <IconButton title='Editar' color='success' onClick={handleEditar}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton title='Borrar' color='error' onClick={handleBorrar}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </IconButton>
                </Grid>
            ) : ''
            }
        </Toolbar>
    );
};