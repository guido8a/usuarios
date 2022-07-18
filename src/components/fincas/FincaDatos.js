import { Typography } from '@mui/material'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useSelector } from 'react-redux';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PersonIcon from '@mui/icons-material/Person';

export const FincaDatos = () => {

    const { finca } = useSelector(state => state.fincas)

    return (
        <div>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
                                    {finca.email || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />

                    <ListItemAvatar>
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
                                    {finca.telefono || 'N/A'}
                                </Typography>
                            </React.Fragment>
                        }
                    />

                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
                        <AddLocationAltIcon fontSize="small" color="warning" />
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
