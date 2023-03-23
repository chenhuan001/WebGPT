import axios from 'axios';
let serive = axios.create({
    baseURL:'http://124.223.213.145:5500'
})
serive.interceptors.request.use(config =>{
    console.log(config)
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['Authorization'] = 'Bearer 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';
    return config
})
export default serive