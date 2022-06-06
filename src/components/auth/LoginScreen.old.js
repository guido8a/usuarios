import React from 'react';
import { useForma } from '../../hooks/usaForma';
import './login.css';
import { useDispatch } from 'react-redux';
// import { iniciaLogin, iniciaRegistro } from '../../acciones/auth';
import { iniciaLogin } from '../../acciones/auth';
import Swal from 'sweetalert2';
// import background from "./imagenes/mercado.png";
import background from "../../imagenes/mercado.png";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    //usaForma para login con un usuario existente
    const [ loginValores, loginManejaCambios ] = useForma({
        loginMail: "guido@gmail.com",
        loginPass: '123456'
    })
    const { loginMail, loginPass} = loginValores

    //usaForma para el registro
    // const [ registroValores, registroManejaCambios ] = useForma({
    //     reg_Nombre: "Guido",
    //     reg_Mail: "guido@gmail.com",
    //     reg_Pass1: '123456',
    //     reg_Pass2: '123456'
    // })
    // const { reg_Nombre, reg_Mail, reg_Pass1, reg_Pass2 } = registroValores


    const handleLogin = (e) => {
        e.preventDefault()
        // console.log(loginValores)
        dispatch( iniciaLogin(loginMail, loginPass) )
    }

    // const handleRegistro = (e) => {
    //     e.preventDefault()
    //     if(reg_Pass1 !== reg_Pass2) {
    //         return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error') 
    //     }
    //     // console.log(registroValores)
    //     dispatch( iniciaRegistro(reg_Nombre, reg_Mail, reg_Pass1) )
    // }

    return (
        <div className="container login-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginMail"
                                value={ loginMail }
                                onChange={ loginManejaCambios }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPass"
                                value={ loginPass }                       
                                onChange={ loginManejaCambios }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
