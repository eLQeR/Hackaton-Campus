import { string, func } from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ className, onClick }) => {
    return (
        <div className={className}>
            <Link to="/groups">
                <span onClick={onClick}>Список груп</span>
            </Link>
            <Link to="/tests">
                <span onClick={onClick}>Мої тести</span>
            </Link>
        </div>
    )
}

Navbar.propTypes = {
    className: string,
    onClick: func,
}

export default Navbar
