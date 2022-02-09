import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import twitterIcon from '../../assets/icons/twitt.png';
import mediumIcon from '../../assets/icons/medium.png';
import discordIcon from '../../assets/icons/disc.png';


const SideNav = (props) => {
    const [tabState, setTabState] = useState(0);
    const mainLogo = require("../../assets/gif/ArteraLogo.gif");
    const navStyling = 'side-nav__active-tab';
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
                        <li >
                            <Link to='/'
                                className={tabState === 0 ? navStyling: ''} 
                                onClick={() => setTabState(0) }
                                >
                                    DASHBOARD
                            </Link>
                        </li>
                        <li >
                            <Link to='/launch-pad'
                                className={tabState === 1 ? navStyling: ''}  
                                onClick={() => setTabState(1) } 
                                >
                                    LAUNCHPAD
                            </Link>
                        </li>
                        <li>
                            <Link to='/governance'
                                className={tabState === 2 ? navStyling: ''} 
                                onClick={() => setTabState(2) } 
                                >   
                                    GOVERNANCE
                            </Link>
                        </li>
                        <li>
                            <Link to='/applications'
                                className={tabState === 3 ? navStyling: ''} 
                                onClick={() => setTabState(3) } 
                                >
                                    APPLICATIONS
                            </Link>
                        </li>
                        <li>
                            <Link to='/claims' 
                                className={tabState === 4 ? navStyling: ''}
                                onClick={() => setTabState(4) } 
                                >
                                    CLAIM TOKENS
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='side-nav__footer'>
                    <h4>ARTERALABS</h4>
                    <div className='side-nav__icons'>
                    <a href="https://twitter.com/ArteraLabs"  target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt='twitter'></img></a>
                    <a href="https://medium.com/@arteralabs"  target="_blank" rel="noopener noreferrer"><img src={mediumIcon} alt='medium'></img></a>
                    <a href="https://discord.gg/Xn63NJSvxM"  target="_blank" rel="noopener noreferrer"><img src={discordIcon} alt='discord'></img></a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default SideNav;
