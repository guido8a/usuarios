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
import NumbersIcon from '@mui/icons-material/Numbers';

export const ComunidadDatos = () => {

    const { elemento } = useSelector(state => state.geografia)

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
                                    {elemento[0].nombre}
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
                        primary="Longitud"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {elemento[0].logitud}
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
                        primary="Latitud"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {elemento[0].latitud}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <NumbersIcon fontSize="small" color="info" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Número secuencial"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {elemento[0].numero}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>

        </div>
    )
}
