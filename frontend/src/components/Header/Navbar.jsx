import { string, func } from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({ className, onClick }) => {
    const { user } = useSelector((state) => state.user)

    return (
        <div className={className}>
            {user?.role === 'Викладач' && (
                <div>
                    <Link to="/groups">
                        <span onClick={onClick}>Список груп</span>
                    </Link>
                </div>
            )}
            {user?.role === 'Викладач' && (
                <div>
                    <Link to="/tests">
                        <span onClick={onClick}>Мої тести</span>
                    </Link>
                </div>
            )}
            {user?.role === 'Студент' && (
                <div>
                    <Link to="/user-tests">
                        <span onClick={onClick}>Мої тести</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

Navbar.propTypes = {
    className: string,
    onClick: func,
}

export default Navbar
