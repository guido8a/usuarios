import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { accion_cerrarModal } from '../../acciones/ui';
import { accion_bd_actualizaEvento, accion_lipiarActiva, accion_bd_nuevoEvento } from '../../acciones/evento';
import { accion_bd_actualizaRuta, accion_bd_creaRuta, accion_lipiarRuta } from '../../acciones/modulo';

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

const reg_Inicial = {
  id: 0,
  orden: 0,
  descripcion: '',
  handler: '',
  icono: '',
  metodo: '',
  moduloid: 1,
}

export const RutaModal = () => {

  const dispatch = useDispatch();
  const [tituloOk, setTituloOk] = useState(true)
  const { modulos, rutaActiva } = useSelector(state => state.mdlo);

  // console.log('>>rutaActiva:', rutaActiva)
  //useForm para manejo de la forma en modal
  const [valoresForma, setValoresForma] = useState(reg_Inicial)
  const { modalOpen } = useSelector(state => state.ui);

  const { orden, descripcion, handler, icono, metodo, moduloid } = valoresForma

  //efecto para cargar evento actual
  useEffect(() => {
    if (rutaActiva) {
      // console.log('carga ruta activa a modal')
      setValoresForma(rutaActiva)
    } else {
      setValoresForma(reg_Inicial)
    }
  }, [rutaActiva, setValoresForma])


  const handleCambios = ({ target }) => {
    // console.log("valores:", target.name)
    if(target.name === "orden" || target.name === "moduloid") {
      setValoresForma({
        ...valoresForma,
        [target.name]: parseInt(target.value)
      })  
    } else {
      setValoresForma({
        ...valoresForma,
        [target.name]: target.value
      })  
    }
  }

  const closeModal = () => {
    dispatch(accion_cerrarModal())
    dispatch(accion_lipiarRuta())
    setValoresForma(reg_Inicial)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(valoresForma)
    if (handler.trim() === "") {
       Swal.fire('Error', 'Debe existir una ruta', 'error')
       return
    }

    if (descripcion.trim().length < 2) {
      return setTituloOk(false)
    }
    setTituloOk(true)

    const modulo = valoresForma["modulo"]
    delete valoresForma["modulo"]
    valoresForma["tiporuta"]=1
    if (rutaActiva) {
      console.log('actualiza...')
      dispatch(accion_bd_actualizaRuta(valoresForma, modulo))
    } else {
      console.log('inserta...')
      dispatch(accion_bd_creaRuta(valoresForma))
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
      <h1> {rutaActiva ? 'Editando el registro' : 'Nuevo registro'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>

        <hr />
        <div className="form-group">
          <label>Orden</label>
          <input
            type="number"
            // className="form-control"
            className={`form-control ${!tituloOk && 'is-invalid'}`}
            placeholder="Orden"
            name="orden"
            autoComplete="off"
            value={orden}
            onChange={handleCambios}
          />
          <label>Acción</label>
          <input
            type="text"
            // className="form-control"
            className={`form-control ${!tituloOk && 'is-invalid'}`}
            placeholder="Acción"
            name="descripcion"
            autoComplete="off"
            value={descripcion}
            onChange={handleCambios}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>
        <label>Ruta</label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="/ruta"
            autoComplete="off"
            name="handler"
            value={handler}
            onChange={handleCambios}
          />
        </div>
        <label>Ícono</label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="fa fa-edit"
            autoComplete="off"
            name="icono"
            value={icono}
            onChange={handleCambios}
          />
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>
        <div>
          <select name="moduloid" id="moduloid" className="form-control"
            value={moduloid}
          // onChange={(event) => handleCambios(event.target)}
          onChange={handleCambios}
          >
            {modulos.map((m) => (
              <option key={m.id} value={m.id} 
                defaultValue={m.id === moduloid ? true : false} >{m.nombre}</option>
            ))}
          </select>
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
