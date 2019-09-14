import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://35.240.206.150'
})

export default instance
