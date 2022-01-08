import React, { useState } from 'react';
import './App.css';

import SideNav from './components/SideNav/SideNav';
import Tag from './components/Tag/Tag';
import DashBoard from './components/Dashboard/Dashboard';
import LaunchPad from './components/LaunchPad/LaunchPad';
import Governance from './components/Governance/Governance';
import Applications from './components/Applications/Applications';

function App() {

  const [contentSelect, setContentSelect] = useState(0);
  //Use another JS file you make your HTTP requests to retrieve data, and populate this property. Move to another file later.
  const userModel = { balance: 455, voteStrength: 5460, supportedProjects: 12 }

  const displayContentOnClick = (event) =>{
    setContentSelect(event.target.value);
  }

  return (
    <React.Fragment>
      <Tag></Tag>
      <div className='site__wrapper'>
        <SideNav dispalyContentHandler={displayContentOnClick} selectedNav={contentSelect} />
        <div className='site__content'>
          {contentSelect === 0 && <DashBoard userInfo={userModel} />}
          {contentSelect === 1 && <LaunchPad userInfo={userModel} />}
          {contentSelect === 2 && <Governance  />}
          {contentSelect === 3 && <Applications userInfo={userModel} />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
