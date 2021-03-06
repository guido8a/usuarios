const baseUrl = process.env.REACT_APP_API_URL;


export const fetchSinToken = (endPoint, data, method = 'GET') => {
    // console.log(data)
    const url = `${baseUrl}/${endPoint}`  //localhost:4000/api/
    // console.log('url:', url, method)

    if (method === 'GET') {
        return fetch(url)
    } else {
        //envía body en formato json
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

//se envía como header el token
export const fetchConToken = (endPoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endPoint}`  //localhost:4000/api/
    const token = localStorage.getItem('token') || ''  //para no tener null
    // console.log('url:', url, 'token', token, method, "data", data)

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'token': `Td ${token}`
            }
        })
    } else {
        //envía body en formato json
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json', 'token': `Td ${token}`
            },
            body: JSON.stringify(data)
        })
    }
}

//retorna perfiles desde la BD
export const fetchPerfiles = (method = 'GET') => {
    const token = localStorage.getItem('token') || ''
    const url = `${baseUrl}/prfl`
    return fetch(url, {
        method,
        headers: {
            'token': `Td ${token}`
        }
    })
}

//retorna permisos desde la BD
export const fetchPermisos = (perfil, modulo, method = 'GET') => {
    const token = localStorage.getItem('token') || ''
    const url = `${baseUrl}/permisos/${perfil}/${modulo}`
    return fetch(url, {
        method,
        headers: {
            'token': `Td ${token}`
        }
    })

}
