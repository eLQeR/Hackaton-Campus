import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const ProfileButton = () => {
    return (
        <div id={'login-group'}>
            <Link to="/profile">
                <CgProfile />
            </Link>
        </div>
    )
}

export default ProfileButton
