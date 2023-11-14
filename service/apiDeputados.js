import axios from "axios";


const apiDeputados = axios.create({
    baseURL: 'http://localhost:3000/',
})

export default apiDeputados