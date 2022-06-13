import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { accion_cargaModulos, poneRutaActiva } from '../../acciones/modulo';
import { accion_abrirModal } from '../../acciones/ui';
import { useForma } from '../../hooks/usaForma';
import { RutaModal } from '../principal/RutaModal';

export const RutasScreen = ({ rutas, modulos }) => {

  const dispatch = useDispatch();
  // const [perfil, setPerfil] = useState(1)

  const handleEdita = (e) => {
    const val = e.target.parentElement.getAttribute("data-id")
    console.log('target:', val)
    dispatch(poneRutaActiva(val))
    dispatch(accion_abrirModal() ) 
  }

  console.log('rutas >> :', rutas)

  // return buildTable(rutas);
  return (
    <>
    <div>
      <h3>Rutas</h3>
      <table id="tblAcciones" className="table table-bordered table-condensed table-hover">
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
      </table>
    </div >
    <RutaModal/>
    </>
  )
}