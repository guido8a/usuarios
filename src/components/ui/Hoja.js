import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Person from '@mui/icons-material/Person';
import { cargarUsuariosxFinca } from '../../acciones/datos';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TreeView from '@mui/lab/TreeView';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { seleccionaElementoArbol } from '../../acciones/arbol';

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
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {

    const dispatch = useDispatch();

    const {
        bgColor,
        color,
        // nodeId,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        onDelete,
        id,
        ...other
    } = props;

    // const handleDelete = () => onDelete(labelInfo);
    const handleDelete = () => {
        // console.log('seleccionado ', id)
        dispatch(seleccionaElementoArbol(id));     
    }

        return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }} onClick={handleDelete}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit" onClick={handleDelete}>
                        {labelInfo}
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

export const Hoja = (principal) => {


    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(cargarUsuariosxFinca(principal.principal))
    // }, [dispatch])

    const { usuarios, usuariosxfincas } = useSelector(state => state.ui);

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

    return (
        <div>
            {usuarios.map((user) => (
                user.fincaid === principal.principal ?
                    <StyledTreeItem
                        key={user.id}
                        nodeId={'"' + user.id + '"'}
                        // nodeId={user.id}
                        id={user.id}
                        labelText={user.nombre + " " + user.apellido}
                        labelIcon={Person}
                        labelInfo={user.cedula}
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onContextMenu={handleContextMenu}
                        style={{ cursor: 'context-menu' }}
                    /> : ''
            ))}
            {/* {usuariosxfincas.map((user) => (
                <StyledTreeItem
                    key={user.id}
                    nodeId={'"f-' + user.id + '"'}
                    labelText={user.nombre + " " + user.apellido}
                    labelIcon={Person}
                    labelInfo={user.cedula}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                />
            ))} */}

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
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit"> Ver
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>   <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                    <Typography variant="inherit"> Editar
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>   <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                    <Typography variant="inherit"> Borrar
                    </Typography>
                </MenuItem>
            </Menu>

        </div>
    )
}
