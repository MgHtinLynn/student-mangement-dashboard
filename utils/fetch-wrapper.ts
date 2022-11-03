import { fetchPagination, URLObj } from "../types/fetch-wrapper"

export const fetchWrapper = {
    findById,
    fetchDataPagination,
    post,
    put,
    delete: _delete
};


type params = {
    path: string
    token: string | null
}

async function findById({path, token}: params) {

    const fetchObject = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            //"Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    console.log('fetchObject', fetchObject)

    const respond = await fetch( process.env.BASE_URL + path, fetchObject)

    if (respond.ok) {
        return respond.json()
    } else {
        console.log('error', respond)
        return { data: {}}
    }
}

async function post({path, body}: URLObj) {
    const authHead = await authHeader().then(h => h)
    const fetchObject = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHead
        },
        body: JSON.stringify(body)
    }
    const fullUrl = process.env.BASE_URL + path
    return await fetch(fullUrl, fetchObject)
        .then((res) => res.json())
        .then((resp) => resp.data)
        .catch((error) => {
            console.log(error)
        })
}

async function put({path, body}: URLObj) {
    const authHead = await authHeader().then(h => h)
    const fetchObject = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHead
        },
        body: JSON.stringify(body)
    }
    const fullUrl = process.env.BASE_URL + path

    return await fetch(fullUrl, fetchObject)
        .then((res) => res.json())
        .then((resp) => resp.data)
        .catch((error) => {
            console.log(error)
        })
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(path:string) {
    const authHead = await authHeader().then(h => h)
    const fetchObject = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHead
        },
    };

    const fullUrl = process.env.BASE_URL + path
    return await fetch(fullUrl, fetchObject)
        .then((res) => res.json())
        .then((resp) => resp.data)
        .catch((error) => {
            console.log(error)
        })
}


async function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url

    const authData = await fetch('/api/auth/jwt').then(res => res.json());

    return {Authorization: `Bearer ${authData?.accessToken}`};
}


async function fetchDataPagination({path, token} : fetchPagination) {

    const fetchObject = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const respond = await fetch( process.env.BASE_URL + path, fetchObject)
    if (respond.ok) {
        return respond.json()
    } else {
        console.log('error', respond)
        return { data: [], total: 0}
    }
}
