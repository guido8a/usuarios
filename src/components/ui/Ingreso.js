import React from 'react';
import { useForma } from '../../hooks/usaForma';
import '../ui/ingreso.css';
import { useDispatch } from 'react-redux';
import { iniciaLogin } from '../../acciones/auth';
import Swal from 'sweetalert2';

export const IngresoScreen = () => {

    const dispatch = useDispatch();

    //usaForma para login con un usuario existente
    const [loginValores, loginManejaCambios] = useForma({
        loginMail: "guido@gmail.com",
        loginPass: '123456'
    })
    const { loginMail, loginPass } = loginValores

    const handleIngreso = (e) => {
        e.preventDefault()
        dispatch(iniciaLogin(loginMail, loginPass))
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sistema Rikcharina</h3>
                    <form onSubmit={handleIngreso}>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn btn-success"
                                value="Ingreso"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
