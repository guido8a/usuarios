import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { iniciaLogout } from '../../acciones/auth';


import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from './StyledMenu';
import { Icon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'

export const Navbar = () => {

  const { nombre } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(iniciaLogout())
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <div classNameName='navbar navbar-dark bg-dark mb-4'>
    //     <span classNameName='navbar-brand'>
    //         { nombre }
    //     </span>
    //     <button classNameName='btn btn-outline-danger'
    //       onClick={ handleLogout }  
    //     >
    //         <i classNameName='fas fa-sign-out-alt'></i>
    //         <span> Salir</span>
    //     </button>

    // </div>


    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'royalblue', marginBottom: '10px' }}>

      <div className="container-fluid">

        <a className="navbar-brand" href="/"><strong><i className='fa fa-user'></i> {nombre}</strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

       {/* armar opciones de menú por módulos */}
        <div>
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
            <MenuItem onClick={handleClose} disableRipple>
              <EditIcon />
              <a className="navbar-brand" href="/registro"> Registro </a>
            </MenuItem>

            <MenuItem onClick={handleClose} disableRipple>
              <FontAwesomeIcon icon={faAddressBook} />
               <a className="navbar-brand" href="/usuarios" style={{marginLeft: "10px"}}> Usuarios </a>
            </MenuItem>
          </StyledMenu>
        </div>

        <button className="btn btn-danger"
          onClick={handleLogout} style={{ float: 'right' }}
          type="button"> <i className='fas fa-sign-out-alt'></i> <span> Salir</span>
        </button>
      </div>
    </nav>
  )
}


