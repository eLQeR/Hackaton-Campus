import { useState } from 'react'
import Navbar from './Navbar'
import {Divide as Hamburger} from 'hamburger-react'

const NavbarButton = () => {
    const [navbarVisible, setNavbarVisible] = useState(false)
    return (
        <div>
            <div
                className={`navbutton-back ${
                    navbarVisible
                        ? 'navbutton-back-opened'
                        : 'navbutton-back-closed'
                }`}
            >
                <Hamburger toggled={navbarVisible} toggle={setNavbarVisible} duration={0.75}/>
            </div>
            <Navbar
                className={`navbar ${
                    navbarVisible ? 'navbar-opened' : 'navbar-closed'
                }`}
            />
        </div>
    )
}

export default NavbarButton