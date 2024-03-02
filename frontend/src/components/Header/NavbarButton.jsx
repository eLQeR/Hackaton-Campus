import { useState } from 'react'
import Navbar from './Navbar'

const NavbarButton = () => {
    const [navbarVisible, setNavbarVisible] = useState(false)

    return (
        <div>
            <p onClick={() => setNavbarVisible((prev) => !prev)}>
                NavbarButton
            </p>
            <Navbar
                className={navbarVisible ? 'navbar-opened' : 'navbar-closed'}
            />
        </div>
    )
}

export default NavbarButton
