import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Comunidad } from './Comunidad';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import { borrarParroquia, editarParroquia, nuevaComunidad, seleccionarElemento, verParroquia } from '../../acciones/geografia';
import DvrIcon from '@mui/icons-material/Dvr';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2';


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: ' #191e7d ',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(4),
        },
    },
}));

function StyledTreeItem(props) {

    const dispatch = useDispatch();

    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        onDelete,
        id,
        ...other
    } = props;

    const handleSeleccionar = () => {
        dispatch(seleccionarElemento({ id: id, tipoGeografia: 3 }));
    }

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }} onClick={handleSeleccionar}>
                        {labelText}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

export const Parroquia = (canton) => {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(retornaParroquias(canton.canton));

    //     return () => {
    //         dispatch(limpiarParroquias());   
    //     }
    // }, [dispatch])

    const { parroquias, tipoGeografia, seleccionado } = useSelector(state => state.geografia);
    const arregloParroquias = parroquias.filter(e => e.cantonId === canton.canton);

    //context menu
    const [contextMenuParr, setContextMenuParr] = React.useState(null);

    const handleContextMenuParroquia = (event) => {
        event.preventDefault();
        setContextMenuParr(
            contextMenuParr === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

    const handleCloseParr = () => {
        setContextMenuParr(null);
    };

    const handleVerParr = () => {
        dispatch(verParroquia(seleccionado));
    }

    const handleEditarParr = () => {
        dispatch(editarParroquia(seleccionado));
    }

    const handleBorrarParr = () => {

        Swal.fire({
            title: "Está seguro de borrar esta parroquia?",
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarParroquia(seleccionado))
            }
        })
    }

    const handleNuevaComunidad = () => {
        dispatch(nuevaComunidad());
    }

    return (
        <div>
            {
                arregloParroquias.map((parroquia) => (
                    (<StyledTreeItem
                        key={parroquia.id}
                        nodeId={'parroquia_' + parroquia.id}
                        id={parroquia.id}
                        labelText={parroquia.nombre}
                        labelIcon={MapsHomeWorkRoundedIcon}
                        // labelInfo={user.cedula}
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onContextMenu={tipoGeografia === 3 ? handleContextMenuParroquia : handleCloseParr}
                        style={{ cursor: 'context-menu' }}
                    >
                        <Comunidad parroquia={parroquia.id} />
                    </StyledTreeItem>)
                ))}

            <Menu
                open={contextMenuParr !== null}
                onClose={handleCloseParr}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenuParr !== null
                        ? { top: contextMenuParr.mouseY, left: contextMenuParr.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleVerParr}>
                    <ListItemIcon>
                        <DvrIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="inherit"> Ver
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleEditarParr}>   <ListItemIcon>
                    <EditIcon fontSize="small" color="success" />
                </ListItemIcon>
                    <Typography variant="inherit"> Editar
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleBorrarParr}>   <ListItemIcon>
                    <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
                </ListItemIcon>
                    <Typography variant="inherit"> Borrar
                    </Typography>
                </MenuItem>
                <Divider variant="inset" component="li" />
                <MenuItem onClick={handleNuevaComunidad}>   <ListItemIcon>
                    <AddBoxIcon fontSize="small" sx={{ color: 'yellowgreen' }} />
                </ListItemIcon>
                    <Typography variant="inherit"> Agregar comunidad
                    </Typography>
                </MenuItem>
            </Menu>

        </div>
    )
}
