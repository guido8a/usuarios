import { Typography } from '@mui/material'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useDispatch, useSelector } from 'react-redux';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BadgeIcon from '@mui/icons-material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { cargarProvinciaFinca, cargarCantonFinca, cargarParroquiaFinca, cargarComunidadFinca } from '../../acciones/geografia';

export const FincaDatos = () => {

    const dispatch = useDispatch();

    const { finca } = useSelector(state => state.fincas)

    React.useEffect(() => {
        dispatch(cargarProvinciaFinca(finca.provid));
        dispatch(cargarCantonFinca(finca.cntnid));
        dispatch(cargarParroquiaFinca(finca.parrid));
        dispatch(cargarComunidadFinca(finca.comunidadid));
    }, [])

    const { provincia, canton, parroquia, comunidad } = useSelector(state => state.geografia)


    return (
        <div>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <AddLocationAltIcon fontSize="small" color="warning" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Provincia"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {provincia[0].nombre}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemAvatar>
                        <AddLocationAltIcon fontSize="small" color="warning" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Cantón"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {canton[0].nombre}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <AddLocationAltIcon fontSize="small" color="warning" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Parroquia"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {parroquia[0].nombre}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemAvatar>
                        <AddLocationAltIcon fontSize="small" color="warning" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Comunidad"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {comunidad[0].nombre}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />


                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <PersonIcon fontSize="small" color="success" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Nombre"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.nombre}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemAvatar>
                        <BadgeIcon fontSize="small" color="success" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Ruc"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.ruc}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                        <PhoneIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Teléfono"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.telefono || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemAvatar>
                        <AlternateEmailIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Email"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.email || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />
               

                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <ImportContactsIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Dirección"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.direccion || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />

                    <ListItemAvatar>
                        <ImportContactsIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Referencia"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.referencia || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />

                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <ChatIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Obervaciones"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {finca.observaciones || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <BeenhereIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Estado"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Se encuentra legalizado: {finca.legalizado === 'S' ? 'SI' : 'NO'}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>

            </List>
        </div>
    )
}
