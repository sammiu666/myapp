import axios from 'axios'

const instance = axios.create({
    baseURL:'https://vuedemo-1f126.firebaseio.com'
})

export default instance