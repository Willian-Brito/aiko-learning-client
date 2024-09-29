import axios from 'axios'
import { BASE_API_URL } from '@/config/environment.js'

class UserController {
    
    async GetAll() {
        const response = await axios.get(`${BASE_API_URL}/user`)
        const users = response.data.data;
        users.forEach(item => delete item.articles);

        return users
    }
}

export default new UserController();