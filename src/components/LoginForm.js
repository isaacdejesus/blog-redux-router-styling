import { logIn } from '../reducers/userReducer.js'
import { useDispatch } from 'react-redux'
const LoginForm = ({props}) => {
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault()
        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        }        
        dispatch(logIn(credentials)) 
    }
    return (
        <div>
            <h2> Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        name="username"
                    />
                </div>
                <div>
                    password
                    <input
                        name="password"
                        type="password"
                    />
                </div>
                    <button type="submit">login</button>
                </form>
            </div>
    )
}

export default LoginForm
