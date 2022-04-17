import axios from 'axios'

const getAll = (url) => {
    return axios.get(url)
}

const getById = (url,id) => {
    return axios.get(url+id)
}

const addItem = (url,obj) => {
    return axios.post(url,obj)
}

const updateItem = (url,id,obj) => {
    return axios.put(url+id,obj)
}

const deleteItem = (url,id) => {
    return axios.delete(url+id)
}

export default {getAll, getById, addItem, updateItem, deleteItem}