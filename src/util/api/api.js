import request from '../request'
const apis = {
    commit:(data)=>{ return request({
        url:'/api/chatGPT',
        method:'POST',
        data:data
    })},
    login:(data)=>{ return request({
        url:'/api/login',
        method:'POST',
        data:data
    })},
    register:(data)=>{ return request({
        url:'/api/register',
        method:'POST',
        data:data
    })},
}
export default apis