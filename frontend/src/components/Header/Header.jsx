import NavbarButton from './NavbarButton'
import Title from './Title'
import ProfileButton from './ProfileButton'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <NavbarButton />
            <Link to="/">
                <Title />
            </Link>
            <ProfileButton />
        </header>
    )
}

export default Header
