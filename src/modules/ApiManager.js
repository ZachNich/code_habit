const url = 'http://localhost:5000'

export default {
    get(arrName, id) {
        return fetch(`${url}/${arrName}/${id}`)
            .then(result => result.json())
    },
    getAll(arrName) {
        return fetch(`${url}/${arrName}`)
            .then(result => result.json())
    },
    getByProperty(arrName, prop, val) {
        return fetch(`${url}/${arrName}?${prop}=${val}`)
            .then(result => result.json())
    },
    post(arrName, object) {
        return fetch(`${url}/${arrName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(result => result.json())
    },
    delete(arrName, id) {
        return fetch(`${url}/${arrName}/${id}`, {
            method: "DELETE"
        }).then(result => result.json())
    },
    update(arrName, object) {
        return fetch(`${url}/${arrName}/${object.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(result => result.json())
    }
}