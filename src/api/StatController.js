import axios from 'axios'
import { BASE_API_URL } from '@/config/environment.js'

class StatController {
    async GetLast() {
        const response = await axios.get(`${BASE_API_URL}/stat`)
        return response.data.payload
    }
}

export default new StatController();