import axios from 'axios'
const baseUrl = 'https://cold-bird-3402.fly.dev/api/comments'

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

export default {  create, }
