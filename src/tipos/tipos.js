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
    finVerFinca: '[FIN] Ver Finca',
    finCargarFinca: '[FIN] Cargar Finca',
    finRetornaTiposOcupacion: '[FIN] Retorna Tipos Ocupación',

    //geografia
    geoRetornarProvincias: '[GEO] Retorna Provincias',
    geoRetornarCantones: '[GEO] Retorna Cantones',
    geoRetornarParroquias: '[GEO] Retorna Parroquias',
    geoRetornarComunidades: '[GEO] Retorna Comunidades',
    geoElementoSeleccionado: '[GEO] Elemento arbol seleccionado',
    geoAbrirModal: '[GEO] Abrir modal',
    geoCerrarModal: '[GEO] Cerrar modal',
    geoEditarCanton: '[GEO] Editar Cantón',
    geoNuevoCanton: '[GEO] Nuevo Cantón',
    geoBorrarCanton: '[GEO] Borrar Cantón',
    geoVerCanton: '[GEO] Ver Cantón',
    geoEditarParroquia: '[GEO] Editar Parroquia',
    geoNuevaParroquia: '[GEO] Nueva Parroquia',
    geoVerParroquia: '[GEO] Ver Parroquia',
    geoBorrarParroquia: '[GEO] Borrar Parroquia',
    geoEditarComunidad: '[GEO] Editar Comunidad',
    geoNuevaComunidad: '[GEO] Nueva Comunidad',
    geoVerComunidad: '[GEO] Ver Comunidad',
    geoBorrarComunidad: '[GEO] Borrar Comunidad',
    geoCantonesxProvincia: '[GEO] Retorna Cantones x Provincia',
    geoRetornaParroquiasxCanton: '[GEO] Retorna Parroquias x Cantón',
    geoRetornaComunidadesxParroquia: '[GEO] Retorna Comunidades x Parroquia',
    geoSeleccionaComunidad: '[GEO] Selecciona comunidad',
    geoCargarProvincia: '[GEO] Cargar Provincia',
    geoCargarCanton: '[GEO] Cargar Cantón',
    geoCargarParroquia: '[GEO] Cargar Parroquia',
    geoCargarComunidad: '[GEO] Cargar Comunidad',

    //organizacion

    orgRetornaOrganizaciones: '[ORG] Retorna Organizaciones',
    orgSeleccionaOrganizacion: '[ORG] Selecciona Organización',
    orgNoSeleccionarOrganizacion: '[ORG] Ninguna organización seleccionada ',
    orgEditarOrganizacion: '[ORG] Editar organización',
    orgNuevaOrganizacion: '[ORG] Nueva organización',
    orgCerrarModalOrganizacion: '[ORG] Cerral modal organización',
    orgBorrarOrganizacion: '[ORG] Borrar organización',

    //institucion

    insRetornaInstituciones: '[INS] Retorna Instituciones',
    insSeleccionaInstitucion: '[INS] Selecciona Institución',
    insNoSeleccionaInstitucion: '[INS] Ninguna Institución seleccionada',
    insEditarInstitucion: '[INS] Editar Institución',
    insNuevaInstitucion: '[INS] Nueva Institución',
    insCerraModalInstitucion: '[INS] Cerrar modal Institución',
    insBorrarInstitucion: '[INS] Borrar Institución',

    //chats

    chtRetornaChats: '[CHT] Retorna Chats',
    chtNuevoChat: '[CHT] Nuevo Chat',
    chtCerrarModalChat: '[CHT] Cerrar modal chat',
    chtRetornaUsuarios: '[CHT] Retorna usuarios',
    chtSeleccionarRoom: '[CHT] Selecciona room',
    chtRetornaChatsxRoom: '[CHT] Retorn chats x room',
    
    

}