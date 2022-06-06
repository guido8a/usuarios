import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { faEdit, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { borrarUsuario } from '../../acciones/datos';
import Swal from 'sweetalert2';
import { accion_editarUsuario } from '../../acciones/ui';

export const ToolBarRegistro = (props) => {

    const { numSelected, idUsuarioSeleccionado, nombres } = props;

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth)
    const { idUsuario } = useSelector(state => state.ui)

    let titulo = `Desea borrar el usuario: ${nombres}?`

    const handleBorrar = () => {
        console.log("borrando....", idUsuarioSeleccionado)
        Swal.fire({
            title: titulo,
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            // denyButtonText: `Don't save`,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                (idUsuarioSeleccionado === parseInt(uid)) ?
                    Swal.fire("Error", "No se puede eliminar este usuario", "error") :
                    dispatch(borrarUsuario(idUsuarioSeleccionado));
            }
        })
    }

    const handleEditar = () => {
        console.log("editando...", idUsuarioSeleccionado)
        dispatch(accion_editarUsuario(idUsuarioSeleccionado));
    }

    const [sel, setSel] = React.useState();

    React.useEffect(() => {
        setSel(idUsuarioSeleccionado)
    }, [handleBorrar])

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

            {/* {numSelected > 0 ? ( */}
            {sel ? (
                <Typography
                    sx={{ flex: '1 1 80%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {/* {numSelected} seleccionado */}

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
                    Lista de Usuarios
                </Typography>
            )}
            {/* {numSelected === 1 ? ( */}
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