import React from 'react';
import ReactDOM from 'react-dom';
import { UsuariosApp } from './UsuariosApp';
import './estilos.css'

// console.log('env;', process.env)

ReactDOM.render(
  // <React.StrictMode>
    <UsuariosApp />,
    document.getElementById('root')
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

