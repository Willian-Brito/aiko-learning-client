import http from '@/services/HttpClient.js'
import { BASE_API_URL } from '@/config/environment.js'

class AuthController {
    
    async Login(user) {
        const response = await http.post(`${BASE_API_URL}/auth/login`, user)
        const token = response.data.payload;
        return token
    }

    async Register(register) {
        const response = await http.post(`${BASE_API_URL}/auth/register`, register)
        const user = response.data.payload;
        return user
    }

    async RefreshToken(token) {
        const response = await http.post(`${BASE_API_URL}/auth/refresh`, token)
        const refreshToken = response.data.payload;
        return refreshToken
    }

    async ValidateToken(user) {

        var json = { "token": user.accessToken }
        const response = 
            await http.post(`${BASE_API_URL}/auth/validateToken`, json)
                .then(res => res.data.payload)
                .catch(() => false)
                // .catch(err => err.response.status === 429 ?  true : false)
        return response
    }
}

export default new AuthController();