import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'; 
import './../App.css'; 

const Nav = () => {
    return(
        <nav>
            <h2 className='nav-children'><Link to="/">Home</Link></h2>
            <h2 className='nav-children'><Link to="/projects">Projects</Link></h2>
            <h2 className='nav-children'><Link to="/misc">Cool little things </Link></h2>
        </nav>
    )    
}

export default Nav;