import axios from 'axios'

const BackEnd = axios.create({
    baseURL: 'https://randomuser.me/api/'
})

export default BackEnd