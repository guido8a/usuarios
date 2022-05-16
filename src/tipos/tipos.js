export const tipos = {
    //manejo del modal
    uiAbrirModal: '[ui] Abrir Modal',
    uiCerrarModal: '[ui] Cerrar Modal',

    //manejo de eventos
    eventoNuevoEvento: '[ev] NuevoEvento',
    eventoActivo: '[ev] Activo',
    enceraEventoActivo: '[ev] encera Activo',
    actualizaEvento: '[ev] actualiza',
    borrarEvento: '[ev] borrar',
    cargarEvento: '[ev] carga eventos desde la BBDD',
    logoutEvento: '[ev] hace logout',
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