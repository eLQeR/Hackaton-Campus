import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const ProfileButton = () => {
    return (
        <div>
            <Link to="/login">
                <CgProfile />
                <button>Profile</button>
            </Link>
        </div>
    )
}

export default ProfileButton
