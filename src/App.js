import React from 'react';
import './App.css';

import SideNav from './components/SideNav/SideNav';
import Modal from './components/UI/Popup/Modal';
import Card from './components/UI/Card/Card';
import Tag from './components/Tag/Tag';

function App() {
  return (
    <React.Fragment>
      <SideNav />
      <Tag></Tag>
      { false && <Modal><Card className="popup__basic">Hi!</Card></Modal>}
    </React.Fragment>
  );
}

export default App;
