import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/',
});

export const get = async (url, options = {}) => {
    const res = await request.get(url, options);
    return res;
};

export default request;
