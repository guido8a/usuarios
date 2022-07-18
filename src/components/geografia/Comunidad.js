import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { borrarComunidad, editarComunidad, seleccionarElemento, verComunidad } from '../../acciones/geografia';
import DeleteIcon from '@mui/icons-material/Delete';
import DvrIcon from '@mui/icons-material/Dvr';
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
            color: '#581845',
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
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        onDelete,
        id,
        ...other
    } = props;

    const handleSeleccionar = () => {
        dispatch(seleccionarElemento({ id: id, tipoGeografia: 4 }));
    }

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }} onClick={handleSeleccionar}>
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

export const Comunidad = (parroquia) => {

    const dispatch = useDispatch();

    const { comunidades, tipoGeografia, seleccionado } = useSelector(state => state.geografia);
    const arregloComunidades = comunidades.filter(e => e.parroquiaId === parroquia.parroquia);

    //context menu
    const [contextMenuCom, setContextMenuCom] = React.useState(null);

    const handleContextMenuCom = (event) => {
        event.preventDefault();
        setContextMenuCom(
            contextMenuCom === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

    const handleCloseCom = () => {
        setContextMenuCom(null);
    };

    const handleEditarCom = () => {
        dispatch(editarComunidad(seleccionado));
    }

    const handleBorrarCom = () => {
        Swal.fire({
            title: "Está seguro de borrar esta comunidad?",
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarComunidad(seleccionado));
            }
        })
    }

    const handleVerCom = () => {
        dispatch(verComunidad(seleccionado));
    }

    return (
        <div>
            {arregloComunidades.map((comunidades) => (
                (<StyledTreeItem
                    key={comunidades.id}
                    nodeId={'comunidad_' + comunidades.id}
                    id={comunidades.id}
                    labelText={comunidades.nombre}
                    labelIcon={GroupRoundedIcon}
                    // labelInfo={user.cedula}
                    color="#e3742f"
                    bgColor="#fcefe3"
                    onContextMenu={tipoGeografia === 4 ? handleContextMenuCom : handleCloseCom}
                    style={{ cursor: 'context-menu' }}
                ></StyledTreeItem>)
            ))}

            <Menu
                open={contextMenuCom !== null}
                onClose={handleCloseCom}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenuCom !== null
                        ? { top: contextMenuCom.mouseY, left: contextMenuCom.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleVerCom}>
                    <ListItemIcon>
                        <DvrIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="inherit"> Ver
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleEditarCom}>   <ListItemIcon>
                    <EditIcon fontSize="small" color="success" />
                </ListItemIcon>
                    <Typography variant="inherit"> Editar
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleBorrarCom}>   <ListItemIcon>
                    <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
                </ListItemIcon>
                    <Typography variant="inherit"> Borrar
                    </Typography>
                </MenuItem>
            </Menu>

        </div>
    )
}
