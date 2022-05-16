import React from 'react';
import { useForma } from '../../hooks/usaForma';
import './registro.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { iniciaRegistro } from '../../acciones/auth';

export const RegistroScreen = ()=>{

    const dispatch = useDispatch();

      //usaForma para el registro
      const [ registroValores, registroManejaCambios ] = useForma({
        reg_Nombre: "Guido",
        reg_Mail: "guido@gmail.com",
        reg_Pass1: '123456',
        reg_Pass2: '123456'
    })

    const { reg_Nombre, reg_Mail, reg_Pass1, reg_Pass2 } = registroValores

    const handleRegistro = (e) => {
        e.preventDefault()
        if(reg_Pass1 !== reg_Pass2) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error') 
        }
        dispatch( iniciaRegistro(reg_Nombre, reg_Mail, reg_Pass1) )
    }

    return (
        <div className="col-md-6 login-form-2">
        <h3>Registro</h3>
        <form onSubmit={ handleRegistro }>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="reg_Nombre"
                    value={reg_Nombre}
                    onChange={ registroManejaCambios }
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Correo"
                    name="reg_Mail"
                    value={reg_Mail}
                    onChange={ registroManejaCambios }
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña" 
                    name="reg_Pass1"
                    value={reg_Pass1}
                    onChange={ registroManejaCambios }
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Repita la contraseña" 
                    name="reg_Pass2"
                    value={reg_Pass2}
                    onChange={ registroManejaCambios }
                />
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    className="btnSubmit" 
                    value="Crear cuenta" />
            </div>
        </form>
    </div>
    )

}