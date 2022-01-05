import React from 'react';
import './SideNav.css';

const SideNav = () => {
    return (
        <div className='side-nav__container'>
            <div className='side-nav__image'>
                <div className='logo-container'>
                    <img className='logo' src="https://arteralabs.org/wp-content/uploads/2021/10/final_rev2.gif" alt="Artera Labs"></img>
                </div>
            </div>
            <div className='side-nav__sections'>
                <ul className='side-nav__ul'>
                    <li>DASHBOARD</li>
                    <li>LAUNCHPAD</li>
                    <li>INCUBATORS</li>
                    <li>GOVERNANCE</li>
                </ul>
            </div>
            <div className='side-nav__footer'>
                <h4>ARTERALABS</h4>
            </div>
        </div>
    )
};

export default SideNav;