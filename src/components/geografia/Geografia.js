import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import { Card, CardContent } from '@mui/material';
import { Container } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Navbar } from '../ui/Navbar';
import { retornaCantones, retornaComunidades, retornaParroquias, retornaProvincias } from '../../acciones/geografia';
import { Canton } from './Canton';
// import Filter1Icon from '@mui/icons-material/Filter1';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';

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
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
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

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};


export const Geografia = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(retornaProvincias());
        dispatch(retornaCantones());
        dispatch(retornaParroquias());
        dispatch(retornaComunidades());
    }, [dispatch])

    const { provincias } = useSelector(state => state.geografia);

    return (
        <div>
            <Navbar />
            <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
                <Card >
                    <CardContent >


                        <TreeView
                            aria-label="gmail"
                            // defaultExpanded={['3']}
                            defaultCollapseIcon={< RemoveCircleOutlineIcon />}
                            multiSelect={false}
                            defaultExpandIcon={<AddBoxIcon />}
                            defaultEndIcon={<div style={{ width: 24 }} />}
                            sx={{ height: 500, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}

                        >
                            {provincias.map((provincia) => (
                                <StyledTreeItem key={provincia.id} nodeId={"provincia_" + provincia.id}
                                    labelText={provincia.nombre} labelIcon={LocalParkingRoundedIcon}>
                                    <Canton provincia={provincia.id} />
                                </StyledTreeItem>
                            ))}

                        </TreeView>
                    </CardContent >
                </Card >
            </Container>
        </div >
    );
}

