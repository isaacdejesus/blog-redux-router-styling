import { useSelector } from 'react-redux'
const GoodNotif = () => {
    const message = useSelector(state => state.notifs)
    if(message === null)
        return null
    return (
        <div className="success">
            {message}
            {console.log(message)}
        </div>
    )
}
export default GoodNotif
