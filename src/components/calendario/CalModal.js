import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { accion_cerrarModal } from '../../acciones/ui';
import { accion_bd_actualizaEvento, accion_lipiarActiva, accion_bd_nuevoEvento } from '../../acciones/evento';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Hay que asociar el elemento donde se visualiza --> root
Modal.setAppElement('#root');

//se pone redondeado a la siguiente hora
const ahora = moment().minutes(0).seconds(0).add(1, 'hours')
const ahoraMas1 = ahora.clone().add(1, 'hours')

const eventoInicial = {
  title: '',
  nota: '',
  start: ahora.toDate(),
  end: ahoraMas1.toDate()
}

export const CalModal = () => {

  const dispatch = useDispatch();

  const { modalOpen } = useSelector(state => state.ui);
  const { eventoActivo } = useSelector(state => state.cal);

  const [fechaInicio, setFechaInicio] = useState(ahora.toDate())
  const [fechaFin, setFechaFin] = useState(ahoraMas1.toDate())
  const [tituloOk, setTituloOk] = useState(true)

  //useForm para manejo de la forma en modal
  const [valoresForma, setValoresForma] = useState(eventoInicial)

  const { title, nota, start, end } = valoresForma

  //efecto para cargar evento actual
  useEffect(() => {
    if (eventoActivo) {
      setValoresForma(eventoActivo)
    } else {
      setValoresForma( eventoInicial)
    }
  }, [eventoActivo, setValoresForma])


  const handleCambios = ({ target }) => {
    setValoresForma({
      ...valoresForma,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    dispatch(accion_cerrarModal())
    dispatch(accion_lipiarActiva())
    setValoresForma(eventoInicial)
  }

  const onChangeFcin = (e) => {
    setFechaInicio(e)
    setValoresForma({
      ...valoresForma,
      start: e
    })
  }
  const onChangeFcfn = (e) => {
    setFechaFin(e)
    setValoresForma({
      ...valoresForma,
      end: e
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(valoresForma)
    //validar fechas
    if (moment(start).isSameOrAfter(moment(end))) {
      Swal.fire('Error', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error')
      return
    }

    //validar campo título
    if (title.trim().length < 2) {
      return setTituloOk(false)
    }
    setTituloOk(true)

    if (eventoActivo) {
      dispatch(accion_bd_actualizaEvento(valoresForma))
    } else {
      dispatch(accion_bd_nuevoEvento(valoresForma))
    }
    setTituloOk(true)
    closeModal()
  }

  return (
    <Modal
      isOpen={modalOpen}  //se ve el modal
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={500}
    >
      <h1> { eventoActivo? 'Editando el evento' : 'Nuevo evento' } </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className="form-control"
            onChange={onChangeFcin}
            name='start'
            value={fechaInicio} />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            onChange={onChangeFcfn}
            minDate={fechaInicio}
            name='end'
            value={fechaFin} />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            // className="form-control"
            className={`form-control ${!tituloOk && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleCambios}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="nota"
            value={nota}
            onChange={handleCambios}

          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
