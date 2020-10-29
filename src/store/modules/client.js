import axios from 'axios'

const base_url = process.env.VUE_APP_BACKEND_URL;
const client = axios.create({
    baseURL: base_url,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default client;