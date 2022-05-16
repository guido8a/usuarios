import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarioScreen } from '../components/calendario/CalendarioScreen';
import { useDispatch, useSelector } from 'react-redux';
import { iniciaChequeoToken } from '../acciones/auth';
import { RutaPrivada } from "./RutaPrivada";
import { RutasPublicas } from "./RutasPublicas";


export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(iniciaChequeoToken())
  }, [dispatch])

  //leer el checking del store
  const { checking } = useSelector(state => state.auth);
  console.log('checking:', checking)

  if (checking) {
    return <h3>Comprobando token...</h3>
  }


  return (
    //   <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<CalendarioScreen />} />
    //     <Route path="login" element={<LoginScreen />} />
    //   </Routes>
    // </BrowserRouter>
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
            <CalendarioScreen />
          </RutaPrivada>
        } />
      </Routes>
    </BrowserRouter>
  )
}