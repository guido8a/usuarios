import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { borrarInstitucion, editarInstitucion } from '../../acciones/institucion';

export const ToolBarInstitucion = (props) => {

    const { numSelected, nombres } = props;

    const { seleccionado } = useSelector(state => state.institucion)

    const dispatch = useDispatch();

    let titulo = `Desea borrar la institución: ${nombres}?`

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
                dispatch(borrarInstitucion(seleccionado));
            }
        })
    }

    const handleEditar = () => {
        dispatch(editarInstitucion(seleccionado));
    }

    const [sel, setSel] = React.useState();

    React.useEffect(() => {
        setSel(seleccionado)
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
                    Lista de Instituciones
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