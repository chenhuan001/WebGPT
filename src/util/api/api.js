import request from '../request'

const apis = {
    commit:(data)=>{ return request({
        url:'/api/chatGPT',
        method:'post',
        data:data
    })},
    login:(data)=>{ return request({
        url:'/login',
        method:'post',
        data:data,
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })},
    register:(data)=>{ return request({
        url:'/api/register',
        method:'POST',
        data:data,
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })},
}
export default apis