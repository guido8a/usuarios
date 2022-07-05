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
    uiNoPerfilSeleccionado: '[UI] Ningún perfil seleccionado',
    uiModuloSeleccionado: '[UI] Módulo seleccionado',
    uiRetornaPermisos: '[UI] Retorna Permisos',
    uiGuardaPermisos: '[UI] Guarda Permisos',
    uiEditarPerfil: '[UI] Editar Perfil',
    uiNuevoPerfil: '[UI] Nuevo Perfil',
    uiCerrarModalPerfil: '[UI] Cerrar modal perfil',
    uiBorrarPerfil: '[UI] Borrar perfil',
    uiCargaPerfilesUsuario: '[UI] Perfiles x usuario',
    uiPerfilUsuario: '[UI] Perfil actual',

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

    //fincas
    finRetornaFincas: '[FIN] Retorna Fincas',
    finSeleccionarFinca: '[FIN] Finca seleccionada',
    finNoseleccionarFinca: '[FIN] Ninguna finca seleccionada',
    finNuevaFinca: '[FIN] Nueva Finca',
    finCerrarModalFinca: '[FIN] Cerrar modal finca',
    finEditarFinca: '[FIN] Editar Finca',
    finBorrarFinca: '[FIN] Borrar Finca',

    //geografia
    geoRetornarProvincias: '[GEO] Retorna Provincias',
    geoRetornarCantones: '[GEO] Retorna Cantones',
    geoRetornarParroquias: '[GEO] Retorna Parroquias',
    geoLimpiezaParroquias: '[GEO] Limpieza Parroquias',

}