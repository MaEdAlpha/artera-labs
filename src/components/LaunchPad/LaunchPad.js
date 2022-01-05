import React, { Fragment } from 'react';
import './LaunchPad.css';
import SectionTitle from '../UI/SectionTitle/SectionTitle';

const LaunchPad = () =>{
    const topText = "KICKSTARTING";
    const bottomText = "NFT PROJECTS";
  
    return (
      <Fragment>
        <SectionTitle
          className="section__launchpad"
          header={topText}
          descriptor={bottomText}
        />
      </Fragment>
    );
}

export default LaunchPad;