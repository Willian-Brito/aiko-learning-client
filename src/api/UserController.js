import http from '@/services/HttpClient.js'
import { BASE_API_URL } from '@/config/environment.js'

class UserController {
    
    async GetPaged(pageNumber = 1, pageLimit = 5) {
        const response = await http.get(`${BASE_API_URL}/user/paged?pageNumber=${pageNumber}&pageLimit=${pageLimit}`)
        const users = response.data.payload;

        return users
    }

    async GetAll() {
        const response = await http.get(`${BASE_API_URL}/user`)
        const users = response.data.payload;
        users.forEach(item => delete item.articles);

        return users
    }

    async GetById(id) {
        const response = await http.get(`${BASE_API_URL}/user/${id}`)
        const user = response.data.payload;        

        return user
    }

    async GetAllRoles() {
        const response = await http.get(`${BASE_API_URL}/user/roles`)
        const roles = response.data.payload;        
        return roles        
    }

    async Save(method, id, user) {        
        return await http[method](`${BASE_API_URL}/user${id}`, user)
    }

    async Delete(id) {        
        return await http.delete(`${BASE_API_URL}/user/${id}`)        
    }
}

export default new UserController();