import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';
import { faEdit, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { noUsuarioSeleccionado, retornaUsuarios, seleccionaUsuario, retornaUsuarioEspecifico } from '../../acciones/datos';
import Swal from 'sweetalert2';
import { ModalUsuario } from './ModalUsuario';
import { abrirModalRegistro, accion_abrirModal } from '../../acciones/ui';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'cedula',
    numeric: true,
    disablePadding: false,
    label: 'Cédula',
  },
  {
    id: 'cargo',
    numeric: true,
    disablePadding: false,
    label: 'Cargo',
  },
  {
    id: 'mail',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
];


function GrupoDeBotones() {

  const dispatch = useDispatch();

  const handleIniciarRegistro = () => {
    dispatch(abrirModalRegistro());
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="contained" color="success" aria-label="outlined primary button group">
      <Button key="one" onClick={handleIniciarRegistro} startIcon={<FontAwesomeIcon icon={faUser}/>}>  Registrar usuario</Button>
      </ButtonGroup>
    </Box>
  );
}


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'seleccionar todo',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, idUsuarioSeleccionado } = props;

  const dispatch = useDispatch();

  const handleBorrar = () => {
    console.log("borrando....", idUsuarioSeleccionado)

    Swal.fire({
      title: 'Desea borrar este registro?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      // denyButtonText: `Don't save`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        // } else if (result.isDenied) {
        // //   Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const handleEditar = () => {
    console.log("editando...", idUsuarioSeleccionado)
    dispatch(retornaUsuarioEspecifico(idUsuarioSeleccionado));
    dispatch(abrirModalRegistro(idUsuarioSeleccionado));
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 80%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionado
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Lista de Usuarios
        </Typography>
      )}
      {numSelected == 1 ? (
        // <Tooltip title="Editar">
        <Grid item xs={1} sm={2}>
          <IconButton title='Editar' onClick={handleEditar}>
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
          <IconButton title='Borrar' onClick={handleBorrar}>
            <FontAwesomeIcon icon={faTrashCan} />
          </IconButton>
        </Grid>
      ) : (numSelected > 1 ?
        (<Tooltip title="Borrar">
          <IconButton>
            <FontAwesomeIcon icon={faTrashCan} />
          </IconButton>
        </Tooltip>) : ''
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaUsuarios() {

  const dispatch = useDispatch();
  const { usuarios } = useSelector(state => state.tabla);
  const { idUsuario } = useSelector(state => state.ui);

  //retorna los usuarios de la BD
  React.useEffect(() => {
    dispatch(retornaUsuarios())
  }, [dispatch])


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selectedID, setSelectedID] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    dispatch(noUsuarioSeleccionado());
    if (event.target.checked) {
      // const newSelecteds = rows.map((n) => n.name);
      const newSelecteds = usuarios.map((n) => n.nombre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    setSelectedID([]);
  };

  const handleClick = (event, name, id) => {

    const selectedIndex = selected.indexOf(name);
    const selectedIndexID = selectedID.indexOf(id);
    let newSelected = [];
    let ids = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      ids = ids.concat(selectedID, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      ids = ids.concat(selectedID.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      ids = ids.concat(selectedID.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      ids = ids.concat(
        selectedID.slice(0, selectedIndexID),
        selectedID.slice(selectedIndexID + 1),
      );
    }

    if (newSelected.length === 1) {
      dispatch(seleccionaUsuario(ids[0]));
    }

    if (newSelected.length !== 1) {
      dispatch(noUsuarioSeleccionado());
    }

    setSelected(newSelected);
    setSelectedID(ids)
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usuarios.length) : 0;

  return (
    <div>
      <GrupoDeBotones />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} idUsuarioSeleccionado={idUsuario} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                // rowCount={rows.length}
                rowCount={usuarios.length}
              />
              <TableBody>
                {/* {stableSort(rows, getComparator(order, orderBy)) */}
                {stableSort(usuarios, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const isItemSelected = isSelected(row.nombre);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.nombre, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        // key={row.name}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.nombre}
                        </TableCell>
                        <TableCell align="right">{row.apellido}</TableCell>
                        <TableCell align="right">{row.cedula}</TableCell>
                        <TableCell align="right">{row.cargo}</TableCell>
                        <TableCell align="right">{row.mail}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            // count={rows.length}
            count={usuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>
      <ModalUsuario />
    </div>
  );
}
