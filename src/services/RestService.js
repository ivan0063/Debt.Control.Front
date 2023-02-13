import axios from 'axios';

const url = "http://192.168.4.70:8081";
//const url = "http://localhost:8081";

const postRequest = (endpoint, body) => {
    return axios.post(url + endpoint, body)
}

const getRequest = (endpoint) => {
    return axios.get(url + endpoint)
}

export default {
    postRequest,
    getRequest
}