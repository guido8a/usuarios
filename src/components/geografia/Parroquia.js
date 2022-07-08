import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Comunidad } from './Comunidad';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import { seleccionarElemento } from '../../acciones/geografia';

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
        dispatch(seleccionarElemento(id));
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

export const Parroquia = (canton) => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(retornaParroquias(canton.canton));
        
    //     return () => {
    //         dispatch(limpiarParroquias());   
    //     }
    // }, [dispatch])

    const { parroquias } = useSelector(state => state.geografia);
    const arregloParroquias = parroquias.filter(e => e.cantonId === canton.canton);
  
    //context menu
    const [contextMenu, setContextMenu] = React.useState(null);

    // const handleContextMenu = (event) => {
    //     event.preventDefault();
    //     setContextMenu(
    //         contextMenu === null
    //             ? {
    //                 mouseX: event.clientX + 2,
    //                 mouseY: event.clientY - 6,
    //             }
    //             : null,
    //     );
    // };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div>
            {
            
            
            arregloParroquias.map((parroquia) => (               
                    (<StyledTreeItem
                        key={parroquia.id}
                        // nodeId={'"' + parroquia.id + '"'}
                        nodeId={'parroquia_' + parroquia.id}
                        id={parroquia.id}
                        labelText={parroquia.nombre}
                        labelIcon={MapsHomeWorkRoundedIcon}
                        // labelInfo={user.cedula}
                        color="#e3742f"
                        bgColor="#fcefe3"
                        // onContextMenu={handleContextMenu}
                        style={{ cursor: 'context-menu' }}
                    >
                        <Comunidad parroquia={parroquia.id}/>
                    </StyledTreeItem>) 
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
