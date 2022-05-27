import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/',
});

export const getUsers = async () => {
    const res = await request.get(`/users?_sort=createdAt&_order=desc`);
    return res.data;
};

export const createUser = async (data) => {
    const res = await request.post(`/users`, data);
    return res.data;
};

export const updateUser = async (data) => {
    const res = await request.put(`/users/${data.id}`, data);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await request.delete(`/users/${id}`);
    return res.data;
};
