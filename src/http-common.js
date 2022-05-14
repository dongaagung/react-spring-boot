import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:1001/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }
});