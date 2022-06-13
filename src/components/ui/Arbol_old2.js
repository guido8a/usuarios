import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses, useTreeItem } from '@mui/lab/TreeItem';
import clsx from "clsx";
import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navbar } from './Navbar';
import { Container } from '@mui/system';
import { Card, CardContent } from '@mui/material';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {
        classes,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
        onDelete
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;
    const handleDelete = () => onDelete(nodeId);

    return (
        <div
            className={clsx(classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled
            })}
            onMouseDown={preventSelection}
            ref={ref}
        >
            <div onClick={handleExpansion} className={classes.iconContainer}>
                {icon}
            </div>
            <EditIcon size="small" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
            </EditIcon>
            <Typography
                onClick={handleSelection}
                component="div"
                className={classes.label}
            >
                {label}
            </Typography>
        </div>
    );
});

function MyTreeItem(props) {
    return (
        <TreeItem
            {...props}
            ContentComponent={CustomContent}
            ContentProps={{
                onDelete: (nodeId) => console.log("delete", nodeId)
            }}
        />
    );
}

export const Arbol = () => {
    return (
        <div>
            <Navbar />
            <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
                <Card >
                    <CardContent >
                        <TreeView
                            defaultCollapseIcon={<RemoveCircleOutlineIcon />}
                            defaultExpandIcon={<AddBoxIcon />}
                            multiSelect
                        >
                            <MyTreeItem nodeId="1" label="Applications">
                                <MyTreeItem nodeId="2" label="Calendar" />
                                <MyTreeItem nodeId="3" label="Chrome" />
                                <MyTreeItem nodeId="4" label="Webstorm" />
                            </MyTreeItem>
                            <MyTreeItem nodeId="5" label="Documents">
                                <MyTreeItem nodeId="6" label="Material-UI">
                                    <MyTreeItem nodeId="7" label="src">
                                        <MyTreeItem nodeId="8" label="index.js" />
                                        <MyTreeItem nodeId="9" label="tree-view.js" />
                                    </MyTreeItem>
                                </MyTreeItem>
                            </MyTreeItem>
                        </TreeView>
                    </CardContent >
                </Card >
            </Container>
        </div>
    )
}

