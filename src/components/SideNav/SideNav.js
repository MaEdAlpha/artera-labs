import React, { Fragment } from 'react';
import './SideNav.css';
import twitterIcon from '../../assets/icons/twitt.png';
import mediumIcon from '../../assets/icons/medium.png';
import discordIcon from '../../assets/icons/disc.png';


const SideNav = (props) => {
    console.log('SideNave App Running');
    const mainLogo = require("../../assets/gif/ArteraLogo.gif");
    return (
        <Fragment>
            <div className='side-nav__container'>
                <div className='side-nav__image'>
                    <div className='logo-container'>
                        <img className='logo' src={mainLogo} alt="Artera Labs"></img>
                    </div>
                </div>
                <div className='side-nav__sections'>
                    <ul className='side-nav__ul'>
                        <li onClick={props.dispalyContentHandler} className={props.selectedNav === 0 ? 'side-nav__li' : ''} value="0">DASHBOARD</li>
                        <li onClick={props.dispalyContentHandler} className={props.selectedNav === 1 ? 'side-nav__li' : ''} value="1" >LAUNCHPAD</li>
                        <li onClick={props.dispalyContentHandler} className={props.selectedNav === 2 ? 'side-nav__li' : ''} value="2">GOVERNANCE</li>
                        <li onClick={props.dispalyContentHandler} className={props.selectedNav === 3 ? 'side-nav__li' : ''} value="3">APPLICATIONS</li>
                    </ul>
                </div>
                <div className='side-nav__footer'>
                    <h4>ARTERALABS</h4>
                    <div className='side-nav__icons'>
                    <a href="https://twitter.com/ArteraLabs"  target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt='twitter'></img></a>
                    <a href="https://medium.com/@arteralabs"  target="_blank" rel="noopener noreferrer"><img src={mediumIcon} alt='medium'></img></a>
                    <a href="https://discord.gg/fX8rraBw8T"  target="_blank" rel="noopener noreferrer"><img src={discordIcon} alt='discord'></img></a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default SideNav;