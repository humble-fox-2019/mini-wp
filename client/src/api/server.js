import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.mindlee.guntoroyk.site'
  // baseURL: 'http://localhost:3001'
})

export default instance;