import React from 'react'
import profile from '../../assets/people.png'

const NavBar = () => {
    return (
        <nav>
            <i className="bx bx-menu"></i>
            <form action="#">
            </form>
            <a href="#" className="notification">
                <i className="bx bxs-bell"></i>
                <span className="num">8</span>
            </a>
            <a href="#" className="profile">
                <img src={profile} />
            </a>
        </nav>
    )
}

export default NavBar