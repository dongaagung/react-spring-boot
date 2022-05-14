import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get('/employees');
}

const getById = id => {
    return httpClient.get(`/employees/${id}`);
}

const create = data => {
    return httpClient.post('/employees', data);
}

const update = data => {
    return httpClient.put('/employees', data);
}

const removeUsingUpdate = id => {
    return httpClient.post(`/employees/delete/${id}`);
}

const remove = id => {
    return httpClient.delete(`/employees/${id}`);
}
export default {getAll, create, getById, update, remove, removeUsingUpdate};