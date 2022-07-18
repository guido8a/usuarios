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
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { CantonForm } from './CantonForm';
import { cerrarModalGeo } from '../../acciones/geografia';
import { CantonDatos } from './CantonDatos';
import { ParroquiaDatos } from './ParroquiaDatos';
import { ComunidadDatos } from './ComunidadDatos';
import { ParroquiaForm } from './ParroquiaForm';
import { ComunidadForm } from './ComunidadForm';

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

export const ModalGeografia = () => {

    const dispatch = useDispatch()

    const { modalOpen, tipo, tipoGeografia } = useSelector(state => state.geografia)

    const handleClose = () => {
        dispatch(cerrarModalGeo());
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={modalOpen}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {tipo === -1 ? 'Nuevo' : (tipo === 1 ? 'Editar' : 'Datos')}
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    {
                        tipo === 0 && tipoGeografia === 2
                            ? (<CantonDatos />)
                            : ((tipo === 0 && tipoGeografia === 3)
                                ? (<ParroquiaDatos />)
                                : ((tipo === 0 && tipoGeografia === 4)
                                    ? (<ComunidadDatos />)
                                    : ((tipo === -1 && tipoGeografia === 1)
                                        ? (<CantonForm />)
                                        : ((tipo === -1 && tipoGeografia === 2))
                                            ? (<ParroquiaForm />)
                                            : ((tipo === -1 && tipoGeografia === 3)
                                                ? (<ComunidadForm />)
                                                : ((tipo === 1 && tipoGeografia === 2)
                                                    ? (<CantonForm />)
                                                    : ((tipo === 1 && tipoGeografia === 3)
                                                        ? (<ParroquiaForm />)
                                                        : ((tipo === 1 && tipoGeografia === 4)
                                                            ? (<ComunidadForm />)
                                                            : null
                                                        )
                                                    )
                                                )
                                            )
                                    )
                                )
                            )

                        // tipo === 0 ? (<CantonDatos />) : ((tipoGeografia === 1 || tipoGeografia === 2) ? <CantonForm /> : null)                    
                    }
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
