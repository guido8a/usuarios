import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RutaModal } from '../principal/RutaModal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import Button from '@mui/material/Button';

import { visuallyHidden } from '@mui/utils';
import { iniciaCargaPerfiles } from '../../acciones/perfiles';
import { guardarPerfilesxUsuario } from '../../acciones/datos';

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
        label: 'Perfil',
    },
    {
        id: 'descripcion',
        numeric: true,
        disablePadding: false,
        label: 'Descripción',
    },
];

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
                        align={'left'}
                        padding={'normal'}
                        sx={{ fontWeight: 'bold' }}
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

//funcion principal
export const TablaPerfilesxUsuario = () => {

    const dispatch = useDispatch();

    //retorna los perfiles de la BD
    React.useEffect(() => {
        dispatch(iniciaCargaPerfiles());
    }, [dispatch])

    const { todos } = useSelector(state => state.perfiles)
    const { perfilesUsuario, idUsuario } = useSelector(state => state.ui)

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    // const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [estado, setEstado] = React.useState([])
    const [ids, setIds] = React.useState([])

    React.useEffect(() => {
        let resultado = []
        let arregloIds = []
        todos.forEach((row) => {
            resultado.push(perfilesUsuario.some(e => (e.Id === row.id)))
            perfilesUsuario.some(e => (e.Id === row.id)) && arregloIds.push(row.id)
            // resultado.push(true);
            // arregloIds.push(row.id);
        });
        setEstado(resultado);
        setIds(arregloIds);
    }, [todos])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const isSelected = (name) => selected.indexOf(name) !== -1
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;

    const handleChange = (position, id) => {

        const updatedCheckedState = estado.map((item, index) =>
            index === position ? !item : item
        );

        setEstado(updatedCheckedState);

        ids.some(e=> (e === id)) ? quitarItem(id) :  agregarItem(id)
        // ids.some(e=> (e === id)) ? onRemoveItem(position) :  agregarItem(id)
    }

    // const onRemoveItem = i => {
    //     console.log("entro remove", i)
    //     setIds(ids => {
    //         const list = ids.filter((item, j) => i !== j);

    //         return {
    //             list,
    //         };
    //     });
    // }

    const quitarItem = (id) => {
        let listaRe = [...ids]
        const l2 = listaRe.filter((item) => item !== id)
        setIds(l2)
    }

    const agregarItem = (id) => {
        let lista = [...ids]
        lista.push(id)
        setIds(lista)
    }

    console.log("estado", estado)
    console.log("ids", ids)

    const handleGuardar = () => {
        let arregloStrings = ''
       
        ids.map((item) => {
            arregloStrings = (arregloStrings !== '' ? (arregloStrings + ",") : '') + `${item}`
        })
      
        const data =({
            ids : arregloStrings 
        })
        
        console.log("arreglado ", data )
       
        dispatch(guardarPerfilesxUsuario(data, idUsuario));
    }

    return (
        <>
            <div>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 400 }}
                                aria-labelledby="tableTitle"
                                size={'small'}
                            >
                                <EnhancedTableHead
                                    // numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={todos.length}
                                />
                                <TableBody>

                                    {stableSort(todos, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            id={`${row.id}`}
                                                            onChange={() => handleChange(index, row.id)}
                                                            checked={estado[index] || false}
                                                            color="primary"
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
                                                        align='left'
                                                    >
                                                        {row.nombre}
                                                    </TableCell>
                                                    <TableCell align="left">{row.descripcion}</TableCell>
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
                    </Paper>

                    <Button type="submit" color='success' onClick={handleGuardar} fullWidth variant="contained"
                        sx={{ mt: 3, mb: 2 }} startIcon={<FontAwesomeIcon icon={faSave} />}
                    >
                        {'Guardar'}
                    </Button>
                </Box>
            </div >
            <RutaModal />
        </>
    )
}