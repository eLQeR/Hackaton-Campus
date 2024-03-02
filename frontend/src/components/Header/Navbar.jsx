import { string, func } from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ className, onClick }) => {
    return (
        <div className={className}>
            <div>
                <Link to="/groups">
                    <span onClick={onClick}>Список груп</span>
                </Link>
            </div>
            <div>
                <Link to="/tests">
                    <span onClick={onClick}>Мої тести</span>
                </Link>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    className: string,
    onClick: func,
}

export default Navbar
