import axios from 'axios'
const baseUrl = 'https://cold-bird-3402.fly.dev/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const createUser = (newUser) => {
    const request = axios.post(baseUrl, newUser)
    return request.data;
}

export default { getAll, createUser }
