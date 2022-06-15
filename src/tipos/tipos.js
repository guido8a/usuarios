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
    uiNuevoUsuario: '[UI] Nuevo usuario',
    uiEditarUsuario: '[UI] Editar usuario',
    uiBorrarUsuario: '[UI] Usuario borrado',
    uiRetornaFincas: '[UI] Retorna Fincas',
    uiRetornaUsuariosFincas: '[UI] Retorna Usuarios x Fincas',
    uiElementoArbol: '[UI] Elemento arbol seleccionado',
    uiRetornaPerfiles: '[UI] Retorna todos los perfiles',
    uiPerfilSeleccionado: '[UI] Perfil seleccionado',
    uiModuloSeleccionado: '[UI] Módulo seleccionado',
    uiRetornaPermisos: '[UI] Retorna Permisos',

    //manejo de eventos
    eventoNuevoEvento: '[ev] NuevoEvento',
    eventoActivo: '[ev] Activo',
    enceraEventoActivo: '[ev] encera Activo',
    actualizaEvento: '[ev] actualiza',

    
    //Enventos que afectan a la BBDD
    eventoBBDDNuevoEvento: '[ev-db] NuevoEvento',

    // usuario
    authCheckingFin: '[auth] fin de revisar el token',
    authLogin: '[auth] login',
    authStartRegister: '[auth] inicia registro',
    authStartTokenRenew: '[auth] inicia nenovación de token',
    authLogout: '[auth] logout',
    authLoginPerfil: '[auth] selecciona perfil',
    
    //menú
    menuCargar: '[menu] carga el menu',
    perfilCargar: '[menu] carga perfiles',
    menuLimpiar: '[menu] limpia menu',

    modulosCargar: '[modulo] carga modulos',
    modulosRutas: '[modulo] carga rutas',
    modulosRutaActiva: '[modulo] ruta activa',
    actualizaRuta: '[modulo] actualiza ruta activa',
    enceraRutaActiva: '[modulo] encera ruta activa',

}