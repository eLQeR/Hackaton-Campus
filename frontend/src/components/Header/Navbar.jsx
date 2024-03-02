import { Link } from 'react-router-dom'

const Navbar = ({ className }) => {
    return (
        <div className={className}>
            <div>
                <Link to="/groups">
                    <span>Список груп</span>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
