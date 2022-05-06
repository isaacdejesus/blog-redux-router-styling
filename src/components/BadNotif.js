import { useSelector } from 'react-redux'
const BadNotif = () => {
    const message = useSelector(state => state.notifs)
    if(message === null)
        return null
    return (
        <div className='error'>
            {message}
        </div>
    )
}
export default BadNotif
