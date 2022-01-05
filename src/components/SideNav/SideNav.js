import React, { Fragment } from 'react';
import './SideNav.css';

const SideNav = (props) => {
    console.log('SideNave App Running')

    return (
        <Fragment>
            <div className='side-nav__container'>
                <div className='side-nav__image'>
                    <div className='logo-container'>
                        <img className='logo' src="https://arteralabs.org/wp-content/uploads/2021/10/final_rev2.gif" alt="Artera Labs"></img>
                    </div>
                </div>
                <div className='side-nav__sections'>
                    <ul className='side-nav__ul'>
                        <li onClick={props.dispalyContentHandler} value="0">DASHBOARD</li>
                        <li onClick={props.dispalyContentHandler} value="1" >LAUNCHPAD</li>
                        <li onClick={props.dispalyContentHandler} value="2">INCUBATORS</li>
                        <li onClick={props.dispalyContentHandler} value="3">GOVERNANCE</li>
                    </ul>
                </div>
                <div className='side-nav__footer'>
                    <h4>ARTERALABS</h4>
                </div>
            </div>
        </Fragment>
    )
};

export default SideNav;