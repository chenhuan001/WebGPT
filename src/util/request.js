import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// const history = useNavigate();
import history from './history';
let serive = axios.create({
    baseURL:'http://124.223.213.145:5500'
})
serive.interceptors.request.use(config =>{
    console.log(config.headers['Content-Type'],'config.headers')
    if(!config.headers['Content-Type']){

        config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    config.headers['Authorization'] = 'Bearer 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';
    return config
})
serive.interceptors.response.use(res =>{
    console.log(res,'res')
    if(res.data){

    }
    return res
})
export default serive