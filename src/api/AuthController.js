import axios from 'axios'
import { BASE_API_URL } from '@/config/environment.js'

class AuthController {
    
    async Login(user) {
        const response = await axios.post(`${BASE_API_URL}/auth/login`, user)
        const token = response.data.payload;
        return token
    }

    async Register(register) {
        const response = await axios.post(`${BASE_API_URL}/auth/register`, register)
        const user = response.data.payload;
        return user
    }

    async RefreshToken(token) {
        const response = await axios.post(`${BASE_API_URL}/auth/refresh`, token)
        const refreshToken = response.data.payload;
        return refreshToken
    }
}

export default new AuthController();