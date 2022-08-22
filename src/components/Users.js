import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
const User = ({user}) => {
    return(
        <div>
           <span>{user.name}</span> 
        </div>
    )
}
const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => users);
    return(
        <div>
            <h1>users </h1>
            {users.map(user => 
                <User key={user.name}  user={user} />
            )}
        </div>
    )
}
export default Users;
