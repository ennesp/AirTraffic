import React from 'react';
import logo from '../images/logo.png';

const Nav = (props) => {
    return(
        <header className="header">
            <img src={logo} alt="Air Traffic" style={{width: 100+'px'}} />
        </header>
    );
}

export default Nav;
