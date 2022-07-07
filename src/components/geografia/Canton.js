import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DvrIcon from '@mui/icons-material/Dvr';
import { Parroquia } from './Parroquia';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { abrirModalGeo, editarCanton, seleccionarElemento } from '../../acciones/geografia';

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
            color: '#19787d',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
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
        dispatch(seleccionarElemento({ id: id, tipoGeografia: 2 }));
    }

    return (
        <StyledTreeItemRoot
            onClick={handleSeleccionar}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    {/* <Typography variant="caption" color="inherit" onClick={handleDelete}>
                        {labelInfo}
                    </Typography> */}
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



export const Canton = (provincia) => {

    const dispatch = useDispatch();

    const { cantones, seleccionado } = useSelector(state => state.geografia);
    const arregloCantones = cantones.filter(e => e.provinciaId === provincia.provincia)

    //context menu
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleEditar = () => {
        dispatch(editarCanton(seleccionado));
    }

    return (
        <div>
            {arregloCantones.map((canton, index) => (
                <StyledTreeItem
                    key={canton.id}
                    nodeId={'canton_' + canton.id}
                    id={canton.id}
                    labelText={canton.nombre}
                    labelIcon={MapRoundedIcon}
                    // labelInfo={user.cedula}
                    color="#777799"
                    bgColor="#777799"
                    onContextMenu={handleContextMenu}
                    style={{ cursor: 'context-menu' }}
                >
                    <Parroquia canton={canton.id} />
                </StyledTreeItem>
            ))}

            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <DvrIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="inherit"> Ver
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleEditar}>   <ListItemIcon>
                    <EditIcon fontSize="small" color="success"/>
                </ListItemIcon>
                    <Typography variant="inherit"> Editar
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>   <ListItemIcon>
                    <DeleteIcon fontSize="small" sx={{color: 'red'}} />
                </ListItemIcon>
                    <Typography variant="inherit"> Borrar
                    </Typography>
                </MenuItem>
            </Menu>

        </div>
    )
}
