import axios from 'axios'

class HttpClient {

    async get(url) {
        return await axios.get(url)
    }

    async post(url, data) {
        return await axios.post(url, data)
    }

    async put(url, data) {
        return await axios.put(url, data)
    }

    async patch(url, data) {
        return await axios.patch(url, data)
    }

    async delete(url) {
        return await axios.delete(url)
    }
}

export default new HttpClient()
