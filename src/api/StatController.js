import http from '@/services/HttpClient.js'
import { BASE_API_URL } from '@/config/environment.js'

class StatController {
    async GetLast() {
        const response = await http.get(`${BASE_API_URL}/stat`)
        return response.data.payload
    }
}

export default new StatController();