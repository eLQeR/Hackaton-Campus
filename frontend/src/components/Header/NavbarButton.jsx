import { useState } from 'react'
import Navbar from './Navbar'

const NavbarButton = () => {
    const [navbarVisible, setNavbarVisible] = useState(false)

    return (
        <div>
            <div className={`navbutton-back ${navbarVisible ? 'navbutton-back-opened' : 'navbutton-back-closed'}`}>
                <p onClick={() => setNavbarVisible((prev) => !prev)}>
                    NavbarButton
                </p>
            </div>
            <Navbar
                className={`navbar ${navbarVisible ? 'navbar-opened' : 'navbar-closed'}`}
            />
        </div>
    )
}

export default NavbarButton
