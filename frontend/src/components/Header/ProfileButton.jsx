import { CgProfile, CgLogOut } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProfileButton = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    return (
        <div id={'login-group'}>
            {user ? (
                <CgLogOut onClick={() => dispatch(logout())} />
            ) : (
                <Link to="/login">
                    <CgProfile />
                </Link>
            )}
        </div>
    )
}

export default ProfileButton
