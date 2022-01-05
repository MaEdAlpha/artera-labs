import React, { useState } from 'react';
import './App.css';

import SideNav from './components/SideNav/SideNav';
import Modal from './components/UI/Popup/Modal';
import Card from './components/UI/Card/Card';
import Tag from './components/Tag/Tag';
import DashBoard from './components/Dashboard/Dashboard';
import LaunchPad from './components/LaunchPad/LaunchPad';
import Incubators from './components/Incubators/Incubators';
import Governance from './components/Governance/Governance';

function App() {
  console.log("App Component");

  const [contentSelect, setContentSelect] = useState(0);

  const displayContentOnClick = (event) =>{
    setContentSelect(event.target.value);
    
    console.log('Content Selected!');
  }

  return (
    <React.Fragment>
      { false && <Modal><Card className="popup__basic">Hi!</Card></Modal>}
      <Tag></Tag>
      <div className='site__wrapper'>
        <SideNav dispalyContentHandler={displayContentOnClick} selectedNav={contentSelect} />
        <div className='site__content'>
          {contentSelect === 0 && <DashBoard />}
          {contentSelect === 1 && <LaunchPad />}
          {contentSelect === 2 && <Incubators />}
          {contentSelect === 3 && <Governance />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
