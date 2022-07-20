import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { noSeleccionaOrganizacion, nuevaOrganizacion, retornaOrganizaciones, seleccionarOrganizacion } from '../../acciones/organizacion';
import { ModalOrganizacion } from './ModalOrganizacion';
import { ToolBarOrganizacion } from './ToolBarOrganizacion';

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
];

function GrupoDeBotones() {

  const dispatch = useDispatch();
  const { seleccionado } = useSelector(state => state.organizacion);

  const handleNuevaOrganizacion = () => {    
    // dispatch(noSeleccionaOrganizacion());     
    // dispatch(retornaOrganizaciones());     
    dispatch(nuevaOrganizacion());    
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
      {/* {!seleccionado &&  */}
      <ButtonGroup variant="contained" color="success" aria-label="outlined primary button group">
        <Button key="one" disabled={seleccionado} onClick={handleNuevaOrganizacion} startIcon={<FontAwesomeIcon icon={faWarehouse} />}>  Nueva organización</Button>
      </ButtonGroup>
      {/* } */}
    </Box>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow>
        <TableCell padding="checkbox">
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const TablaOrganizacion = () => {

  const dispatch = useDispatch();

  const { organizaciones, organizacion, seleccionado} = useSelector(state => state.organizacion);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selectedID, setSelectedID] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

    //retorna las organizaciones de la BD
    React.useEffect(() => {
      dispatch(retornaOrganizaciones());
    }, [dispatch, selectedID])
  

  const handleClick = (event, name, id) => {

    // console.log("name", name)

    const selectedIndex = selected.indexOf(name);

    let newSelected = '';
    let ids = '';

    if (selectedIndex === -1) {
      newSelected = name;
      ids = id;
    } else {
      newSelected = '';
      ids = '';
    }

    if (selectedIndex === -1) {
        dispatch(seleccionarOrganizacion(ids));
    }

    if (selectedIndex === 0) {
        dispatch(noSeleccionaOrganizacion());
    }

    // console.log("first", newSelected)
    // console.log("first", ids)

    setSelected(newSelected)
    setSelectedID(ids)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // const isSelected = (name) => selected.indexOf(name) !== -1;
  
  const isSelected = (id) => id === selectedID 
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - organizaciones.length) : 0;

  return (
    <>
      <GrupoDeBotones />
      <Box sx={{ width: '50%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>

          <ToolBarOrganizacion numSelected={0} nombres={selected} />

          <TableContainer>
            <Table
              sx={{ minWidth: 500 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={organizaciones.length}
              />
              <TableBody>
                {stableSort(organizaciones, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.nombre);
                    const isItemSelected = isSelected(row.id);

                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.nombre, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
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
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
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
            count={organizaciones.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <ModalOrganizacion />
    </>
  );
}