export const tipos = {
    //manejos de la UI
    uiAbrirModal: '[ui] Abrir Modal',
    uiCerrarModal: '[ui] Cerrar Modal',
    uiTablaUsuarios: '[UI] Retorna usuarios',
    uiRegistroCorrecto: '[UI] Registro de usuario correcto',
    uiUsuarioSeleccionado: '[UI] Usuario seleccionado',
    uiNoUsuarioSeleccionado: '[UI] Ningún usuario seleccionado',
    uiAbrirModalRegistro: '[UI] Abrir modal registro',
    uiRetornaUsuario: '[UI] Retorna usuario específico',

    //manejo de eventos
    eventoNuevoEvento: '[ev] NuevoEvento',
    eventoActivo: '[ev] Activo',
    enceraEventoActivo: '[ev] encera Activo',
    actualizaEvento: '[ev] actualiza',
    // borrarEvento: '[ev] borrar',
    // cargarEvento: '[ev] carga eventos desde la BBDD',
    // logoutEvento: '[ev] hace logout',
    
    //Enventos que afectan a la BBDD
    eventoBBDDNuevoEvento: '[ev-db] NuevoEvento',

    //usuario
    authCheckingFin: '[auth] fin de revisar el token',
    authLogin: '[auth] login',
    authStartRegister: '[auth] inicia registro',
    authStartTokenRenew: '[auth] inicia nenovación de token',
    authLogout: '[auth] logout',

}