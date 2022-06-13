import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useSelector, useDispatch } from 'react-redux';
import { iniciaLogout } from '../../acciones/auth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from './StyledMenu';
import Swal from 'sweetalert2';

export const Navbar = () => {

    const { nombre } = useSelector(state => state.auth);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

    const { menus } = useSelector(state => state.menu);

    // console.log("menus navBar:", menus)

    const handleLogout = () => {
        Swal.fire({
            title: 'Desea salir del sistema?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            // denyButtonText: `Don't save`,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(iniciaLogout())
                // } else if (result.isDenied) {
                // //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //CSS para el nombre menú grande
    const sx = {
        mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
        fontWeight: 100, color: 'inherit', //letterSpacing: '.3rem', 
        textDecoration: 'none', '&:hover': {
            color: "#fff",
            fontWeight: 700,
            textDecoration: 'none'
         }
    }

    //CSS para el nombre menú minimizado
    const sxm= {
        mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1,
        fontFamily: 'monospace', fontWeight: 100,
        color: 'inherit', textDecoration: 'none',
        '&:hover': {
            color: "#fff",
            fontWeight: 700,
            textDecoration: 'none'
         }
    }


    return (

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AccountCircle sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap component="a" href="/" sx={sx}>
                        {nombre}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <i className='fa-solid fa-bars fa-xl' onClick={handleOpenNavMenu}></i>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* <MenuItem onClick={handleClose} disableRipple>
                                <i className='fa-solid fa-pencil mr-2' ></i>
                                <a className="navbar-brand" href="/registro"> Registro </a>
                            </MenuItem>

                            <MenuItem onClick={handleClose} disableRipple>
                                <i className='fa-regular fa-address-book mr-2' ></i>
                                <a className="navbar-brand" href="/usuarios" style={{ marginLeft: "10px" }}> Usuarios </a>
                            </MenuItem> */}
                            {menus.map((mn) => (
                                <MenuItem key={mn.id} onClick={handleClose} disableRipple>
                                    {/* <i className={page.icono ? page.icono :'fa-solid fa-asterisk'} ></i> */}
                                    <i className={mn.icono ? mn.icono : 'fa-solid fa-circle-arrow-right'} ></i>
                                    {/* <i className={page.icono ? page.icono :'fa-solid fa-minus'} ></i> */}
                                    <a className="navbar-brand" href={mn.handler} style={{ marginLeft: "10px" }}> {mn.descripcion} </a>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AccountCircle sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography variant="h5" noWrap component="a" href="/" sx={sxm}>
                        {nombre}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}

                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Administración
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {/* <MenuItem onClick={handleClose} disableRipple>
                                <i className='fa-solid fa-pencil mr-2' ></i>
                                <a className="navbar-brand" href="/registro"> Registros </a>
                            </MenuItem>

                            <MenuItem onClick={handleClose} disableRipple>
                                <i className='fa-regular fa-address-book mr-1' ></i>
                                <a className="navbar-brand" href="/usuarios" style={{ marginLeft: "10px" }}> Usuarios </a>
                            </MenuItem> */}
                            {menus.map((mn) => (
                                <MenuItem key={mn.id} onClick={handleClose} disableRipple>
                                    {/* <i className={page.icono ? page.icono :'fa-solid fa-asterisk'} ></i> */}
                                    <i className={mn.icono ? mn.icono : 'fa-solid fa-circle-arrow-right'} ></i>
                                    {/* <i className={page.icono ? page.icono :'fa-solid fa-minus'} ></i> */}
                                    <a className="navbar-brand" href={mn.handler} style={{ marginLeft: "10px" }}> {mn.descripcion} </a>
                                </MenuItem>
                            ))}
                        </StyledMenu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <img alt="Remy Sharp" src="/assets/images/avatar.png" width="32px" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu> */}

                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Salir del sistema">
                            <button className="btn btn-danger"
                                onClick={handleLogout} style={{ float: 'right' }}
                                type="button"> <i className='fa-solid fa-right-from-bracket mr-1' ></i> <span>Salir</span>
                                {/* type="button"> <i className='fa-solid fa-user-xmark mr-1' ></i> <span>Salir</span> */}
                            </button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
