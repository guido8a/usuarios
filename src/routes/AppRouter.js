import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { PortadaScreen } from '../components/principal/PortadaScreen';
import { useDispatch, useSelector } from 'react-redux';
import { iniciaChequeoToken } from '../acciones/auth';
import { RutaPrivada } from "./RutaPrivada";
import { RutasPublicas } from "./RutasPublicas";
import { PerfilesScreen } from '../components/perfiles/Perfiles';
import { Arbol } from '../components/ui/Arbol';
import { Perfiles } from '../components/ui/Perfiles';
import { Fincas } from '../components/fincas/Fincas';
import { Geografia } from '../components/geografia/Geografia';
import { Permisos } from '../components/permisos/Permisos';
import { Usuarios } from '../components/usuarios/Usuarios';


export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(iniciaChequeoToken())
  }, [dispatch])


  //leer el checking del store
  const { checking } = useSelector(state => state.auth);
  // const { cargandoMenu } = useSelector(state => state.menu);

  // if (checking && cargandoMenu) {
  //   return <h3>Comprobando token...</h3>
  // }
  if (checking) {
    return <h3>Comprobando token...</h3>
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginScreen />} /> */}

        <Route path="/login" element={
          <RutasPublicas>
            <LoginScreen />
          </RutasPublicas>
        } />

        <Route path="/*" element={
          <RutaPrivada>
            <PortadaScreen />
          </RutaPrivada>
        } />

        <Route path="/usuarios" element={
          <RutaPrivada>
            <Usuarios />
          </RutaPrivada>
        } />

        <Route path="/arbol" element={
          <RutaPrivada>
            <Arbol />
          </RutaPrivada>
        } />

        <Route path="/rutas" element={
          <RutaPrivada>
            <PerfilesScreen />
          </RutaPrivada>
        } />

        <Route path="/permisos" element={
          <RutaPrivada>
            <Permisos />
          </RutaPrivada>
        } />

        <Route path="/perfiles" element={
          <RutaPrivada>
            <Perfiles />
          </RutaPrivada>
        } />

        <Route path="/fincas" element={
          <RutaPrivada>
            <Fincas />
          </RutaPrivada>
        } />

        {/* <Route path="/geografia" element={
          <RutaPrivada>
            <Geografia />
          </RutaPrivada>
        } /> */}

      </Routes>
    </BrowserRouter>
  )
}