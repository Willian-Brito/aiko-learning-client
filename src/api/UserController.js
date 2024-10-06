import axios from 'axios'
import { BASE_API_URL } from '@/config/environment.js'

class UserController {
    
    async GetAll() {
        const response = await axios.get(`${BASE_API_URL}/user`)
        const users = response.data.payload;
        users.forEach(item => delete item.articles);

        return users
    }

    async GetById(id) {
        const response = await axios.get(`${BASE_API_URL}/user/${id}`)
        const user = response.data.payload;        

        return user
    }

    async GetAllRoles() {
        const response = await axios.get(`${BASE_API_URL}/user/roles`)
        const roles = response.data.payload;        
        return roles        
    }

    async Save(method, id, user) {        
        return await axios[method](`${BASE_API_URL}/user${id}`, user)
    }

    async Delete(id) {        
        return await axios.delete(`${BASE_API_URL}/user/${id}`)        
    }
}

export default new UserController();