import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { accion_cerrarModal } from '../../acciones/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

// import { retornaUsuarioEspecifico } from '../../acciones/datos';
import { RegistroScreen } from '../auth/RegistroScreen';
// import { RegistroScreen_old2 } from '../auth/RegistroScreen_old2';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const ModalUsuario = (estado) => {

    const dispatch = useDispatch()

    const { modalOpen, tipo, usuario, idUsuario } = useSelector(state => state.ui)

    // const aaaaa = dispatch(retornaUsuarioEspecifico(idUsuario))


    // console.log("modal usuario -->", modalOpen)

    // const [open, setOpen] = React.useState(false);

    // setOpen(modalOpen);



        // setOpen(estado);



    //   const handleClickOpen = () => {

    //   };
    const handleClose = () => {
        // setOpen(false);
        dispatch(accion_cerrarModal());
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={modalOpen}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {tipo === -1  ? 'Nuevo Usuario' : 'Editar usuario' } 
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <RegistroScreen />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                        onClick={handleClose} variant="contained" color="primary"
                        startIcon={<FontAwesomeIcon icon={faTimesCircle} />}>
                        Cerrar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
