import React from 'react';
import logo from '../images/logo.png';

const Nav = (props) => {
    return(
        <header className="header" style={{padding: 25+'px '+0}}>
            <img src={logo} alt="Air Traffic" style={{width: 100+'px'}} />
        </header>
    );
}

export default Nav;
