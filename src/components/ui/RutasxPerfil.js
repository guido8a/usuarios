import React from 'react'
import { useSelector } from 'react-redux';
// import { poneRutaActiva } from '../../acciones/modulo';
// import { accion_abrirModal } from '../../acciones/ui';
import { RutaModal } from '../principal/RutaModal';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import SaveIcon from '@mui/icons-material/Save';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
// import { inicioGuardadoPermisos } from '../../acciones/perfiles'
import { ToolBarPermisos } from './ToolBarPermisos';


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
    id: 'ruta',
    numeric: true,
    disablePadding: false,
    label: 'Ruta',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'seleccione todos',
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

// const EnhancedTableToolbar = (props) => {
//   const { numSelected, permisos, seleccionados, existentes, modulo, perfil } = props;

//   const dispatch = useDispatch();

//   // console.log("seleccionados", seleccionados, "existentes", existentes)

//   // let arregloFiltrado = []
//   let arregloStrings = ''

//   const handleGuardar = () => {

//     seleccionados.map((item, index) => {
//       if (item) {
//         addItem(index)
//       }
//     })

//     const data = ({
//       ids: arregloStrings
//     })

//     // console.log("filtrado ", arregloFiltrado, "strings ", arregloStrings, "modulo ", modulo, "perfil ", perfil)
//     // console.log("data", data)
//     dispatch(inicioGuardadoPermisos(data, perfil, modulo));

//     arregloStrings = ''
//   }

//   const addItem = (i) => {
//     // console.log("index ", i)
//     existentes.map((item, index) => {
//       // index === i && (arregloFiltrado = arregloFiltrado.concat(item))
//       index === i && (arregloStrings = ((arregloStrings !== '' ? (arregloStrings + ",") : '') + `${item}`))
//     })
//   }

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       <Typography
//         sx={{ flex: '1 1 100%' }}
//         variant="h6"
//         id="tableTitle"
//         component="div"
//       >
//         Permisos
//       </Typography>

//       {permisos !== 0 ?
//         (<Tooltip title="Guardar">
//           <IconButton color='success' onClick={handleGuardar}>
//             <SaveIcon />
//           </IconButton>
//         </Tooltip>)
//         : ''}

//     </Toolbar>
//   );
// };

//funcion principal
export const RutasxPerfil = () => {


  // const dispatch = useDispatch();

  const { permisos, perfil, modulo } = useSelector(state => state.perfiles)

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [estado, setEstado] = React.useState([])
  const [ids, setIds] = React.useState()

  React.useEffect(() => {
    let resultado = []
    let arregloIds = []
    permisos.forEach((row) => {
      resultado.push(row.prms === 0 ? false : true);
      arregloIds.push(row.id);
    });
    setEstado(resultado);
    setIds(arregloIds);
  }, [permisos, setEstado])

  // console.log("estado", estado)
  // console.log("estado", ids)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
    // if (event.target.checked) {
    //   const newSelecteds = permisos.map((n) => n.id);
    //   setSelected(newSelecteds);
    //   return;
    // }
    // setSelected([]);
  // };

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - permisos.length) : 0;

  const handleChange = (position) => {
    const updatedCheckedState = estado.map((item, index) =>
      index === position ? !item : item
    );

    setEstado(updatedCheckedState);
  }

  return (
    <>
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            {/* <EnhancedTableToolbar numSelected={selected.length}
              permisos={permisos.length} seleccionados={estado} existentes={ids} modulo={modulo} perfil={perfil} /> */}

              <ToolBarPermisos numSelected={selected.length}
              permisos={permisos.length} seleccionados={estado} existentes={ids} modulo={modulo} perfil={perfil} /> 
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'small'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={permisos.length}
                />
                <TableBody>

                  {stableSort(permisos, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      // const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;


                      return (
                        <TableRow
                          hover
                          // onClick={(event) => handleClick(event, row.id, row.prms)}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                        // selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              id={`${row.id}`}
                              // name={row.descripcion}
                              // value={row.descripcion}
                              // onClick={(event) => handleClick(event, row.id, row.prms)}
                              // onChange={handleChange}
                              onChange={() => handleChange(index)}
                              checked={estado[index] || false}
                              // onClick={(event) => handleClick(event, row.id, row.prms)}
                              // onChange={(event) => handleChangeCheck(event, row.id, row.prms)}
                              // defaultChecked={row.prms === 0 ? false : true}
                              color="primary"
                              // checked={row.prms === 0 ? isItemSelected : true}
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
                            {row.descripcion}
                          </TableCell>
                          <TableCell align="right">{row.handler}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows,
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
              count={permisos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>


        {/* <table id="tblAcciones" className="table table-bordered table-condensed table-hover">
        <thead>
          <tr>
            <th width="5%">Orden</th>
            <th width="15%">Acción</th>
            <th width="20%">Ruta</th>
            <th width="20%">Ícono</th>
            <th width="10%">Método</th>
            <th width="20%">Módulo</th>
            <th width="10%">Acción</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta, i) => (
            <tr style={{ backgroundColor: i % 2 ? '#F0FAFF' : 'white' }} key={ruta.id} >
              <td>{ruta.orden}</td>
              <td>{ruta.descripcion}</td>
              <td>{ruta.handler}</td>
              <td>{ruta.icono}</td>
              <td>{ruta.metodo}</td>
              <td>{ruta.modulo}</td>

              <td>
                <button className="btn btn-xs" data-id={ruta.id}
                  title={"título"} key={"ed_" + ruta.id}
                  onClick={handleEdita}
                >
                  <i className={"far fa-edit"}></i>
                </button>
                <button className="btn btn-xs text-danger" data-id="${ruta.id}"
                  title={"título"} key={"md_" + ruta.id}>
                  <i className={"fa-solid fa-eraser"}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div >
      <RutaModal />
    </>
  )
}