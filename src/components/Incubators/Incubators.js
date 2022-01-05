import React, { Fragment } from 'react';
import './Incubators.css';
import SectionTitle from '../UI/SectionTitle/SectionTitle';

const Incubators = () =>{
    const topText = "SUPPORT";
    const bottomText = "INCUBATORS";
  
    return (
      <Fragment>
        <SectionTitle
          className="section__incubators"
          header={topText}
          descriptor={bottomText}
        />
      </Fragment>
    );
}

export default Incubators;