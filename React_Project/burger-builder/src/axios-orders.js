import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-3c666-default-rtdb.firebaseio.com/'
})

export default instance;