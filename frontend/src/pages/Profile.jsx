import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { logout } from '../redux/userSlice/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <div>{user.username}</div>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    )
}

export default Profile
