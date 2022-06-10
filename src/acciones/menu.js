import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { tipos } from "../tipos/tipos";

//carga el menú de un perfil 
export const accion_cargaMenu = ( perfil ) => {
    // console.log('****menu')
    return async(dispatch, getState ) => {  //vienen del thunk
        try {
            const resp = await fetchConToken(`menu/${perfil}`)
            const body = await resp.json()
            // console.log('body_menu: ', body.Registro)
            if(body.ok) {
                const menu = body.Registro
                dispatch( poneMenu(menu) )
            }
    
        } catch (error) {
            console.log(error)            
        }
    }
}

const poneMenu = (menus) => ({
    type: tipos.menuCargar,
    payload: menus
})

export const accion_cargaPerfil = () => {
    console.log('****perfil')
    return async(dispatch, getState ) => {  //vienen del thunk
        const { usuarioId } = getState().auth 
        console.log('++perfil', usuarioId)
        try {
            const resp = await fetchSinToken(`perfiles/${usuarioId}`, {}, 'POST')
            const body = await resp.json()
            console.log('body_perfilmenu: ', body.Registro)
            if(body.ok) {
                const perfiles = body.Registro
                dispatch( cargaPerfil(perfiles) )
            }
            console.log('perfiles: ', body.Registro)
    
        } catch (error) {
            console.log(error)            
        }
    }
}

const cargaPerfil = (perfiles) => ({
    type: tipos.perfilCargar,
    payload: perfiles
})
