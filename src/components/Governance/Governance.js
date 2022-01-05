import React, { Fragment } from 'react';
import './Governance.css';
import SectionTitle from '../UI/SectionTitle/SectionTitle';

const Governance = () =>{
    const topText = "DECIDE&";
    const bottomText = "GOVERN";
  
    return (
      <Fragment>
        <SectionTitle
          className="section__governance"
          header={topText}
          descriptor={bottomText}
        />
      </Fragment>
    );
}

export default Governance;