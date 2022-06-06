import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { accion_cerrarModal } from '../../acciones/ui';
import { accion_bd_actualizaEvento, accion_lipiarActiva, accion_bd_nuevoEvento } from '../../acciones/evento';
import { height } from '@mui/system';
import { accion_cargaMenu, accion_cargaPerfil } from '../../acciones/menu';
import { iniciaLogin, loginUsuario } from '../../acciones/auth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    // minWidth: '20rem',
    width: 'auto',
    maxWidth: '60rem',
    height: 'auto'
  }
};

// Hay que asociar el elemento donde se visualiza --> root
Modal.setAppElement('#root');

//se pone redondeado a la siguiente hora
const ahora = moment().minutes(0).seconds(0).add(1, 'hours')
const ahoraMas1 = ahora.clone().add(1, 'hours')

const eventoInicial = {
  id: 0,
  perfil2: '',
}

export const PerfilModal = () => {

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(accion_cargaPerfil(usuarioId))
  // }, [dispatch])

  const { perfiles } = useSelector(state => state.menu);
  const { usuarioId, usuario } = useSelector(state => state.auth);

  console.log("perfiles:", perfiles, 'usuario:', usuarioId, usuario)

  //useForm para manejo de la forma en modal
  const [valoresForma, setValoresForma] = useState(eventoInicial)
  const [perfil, setPerfil] = useState(1)

  const { modalOpen } = useSelector(state => state.ui);


  const { id, perfil2 } = valoresForma

  const handleCambios = ({ target }) => {
    setValoresForma({
      ...valoresForma,
      [target.name]: target.value
    })
  }

  console.log("Muestra modal")

  const closeModal = () => {
    dispatch(accion_cerrarModal())
    dispatch(accion_lipiarActiva())
    setValoresForma(eventoInicial)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('valores:', perfil) //no funciona: buscar id en base a lo seleccionado.
    dispatch(iniciaLogin(usuarioId, usuario, perfil))
    dispatch(accion_cargaMenu(perfil))
    closeModal()
  }

  const changePerfil = (e) => {
    console.log('target:', e)
    setPerfil(e.value)
  }


  return (
    <Modal
      isOpen={modalOpen}  //se ve el modal
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Perfil"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={500}
    >
      <h5>Seleccione el Perfil</h5>
      <hr />
      <form className="container" onSubmit={handleSubmit}>

        <div className="form-group">
          <select name="perfil" id="perfil" className='form-control' 
            onChange={(event) => changePerfil(event.target)}
            value={perfil}>
            {perfiles.map((prfl) => (
              <option key={prfl.Id} value={prfl.Id}>{prfl.Descripcion}</option>
            ))}
          </select>
          <small id="emailHelp" className="form-text text-muted">Seleccione con que perfil desea ingresar</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Ingresar</span>
        </button>

      </form>
    </Modal>
  )
}
