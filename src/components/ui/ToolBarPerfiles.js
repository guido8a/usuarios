import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { borrarUsuario } from '../../acciones/datos';
import Swal from 'sweetalert2';
import { accion_editarUsuario } from '../../acciones/ui';
import { borrarPerfil, editarPerfil } from '../../acciones/perfiles';

export const ToolBarPerfiles = (props) => {

    const { numSelected, perfilSeleccionado, nombres } = props;

    const dispatch = useDispatch();
    const { perfil } = useSelector(state => state.auth)

    let titulo = `Desea borrar el perfil: ${nombres}?`

    const handleBorrar = () => {
        console.log("borrando....", perfilSeleccionado)
        Swal.fire({
            title: titulo,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                (perfilSeleccionado === parseInt(perfil))
                    ? Swal.fire("Error", "No se puede eliminar este perfil", "error")
                    : dispatch(borrarPerfil(perfilSeleccionado));
            }
        })
    }

    const handleEditar = () => {
        console.log("editando...", perfilSeleccionado)
        dispatch(editarPerfil(perfilSeleccionado));
    }

    const [sel, setSel] = React.useState();

    React.useEffect(() => {
        setSel(perfilSeleccionado)
    }, [handleBorrar, perfilSeleccionado])

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
                    Lista de Perfiles
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