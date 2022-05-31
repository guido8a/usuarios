const baseUrl = process.env.REACT_APP_API_URL;


export const fetchSinToken = (endPoint, data, method = 'GET') => {
    console.log(data)
    const url = `${baseUrl}/${endPoint}`  //localhost:4000/api/
    console.log('url:', url, method)

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
    console.log('url:', url, 'token', token, method, "data", data)

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'token': token
            }
        })
    } else {
        //envía body en formato json
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json', 'token': token
            },
            body: JSON.stringify(data)
        })
    }
}

//retorna usuarios

// export const fetchUsuarios = (data, method = 'GET') => {
//     const url = `${baseUrl}/user`
//     const urlEspecifico = `${baseUrl}/user/${data}`
//     const token = localStorage.getItem('token') || ''

//     console.log("fetchUsuarios->", data, method)

//     if (data) {
//         return fetch(urlEspecifico, {
//             method,
//             headers: {
//                 'token': token
//             }
//         })
//     } else {
//         return fetch(url, {
//             method,
//             headers: {
//                 'token': token
//             }
//         })
//     }
// }