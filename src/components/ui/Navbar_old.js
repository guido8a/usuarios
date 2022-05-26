import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { iniciaLogout } from '../../acciones/auth';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from './StyledMenu';
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


