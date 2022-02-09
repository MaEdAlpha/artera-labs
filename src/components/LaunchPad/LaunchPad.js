import React, { Fragment } from 'react';
import './LaunchPad.css';

import LaunchPadProject from './LaunchPadProject';
import SectionTitle from '../UI/SectionTitle/SectionTitle';
import Card from '../UI/Card/Card';

const LaunchPad = (props) =>{
    const topText = "KICKSTARTING";
    const bottomText = "NFT PROJECTS";
    const NFT_PROJECTS = props.projects;
  
    return (
      <Fragment>
        <SectionTitle
          className="section__launchpad"
          header={topText}
          descriptor={bottomText}
        />
        <section className='launchpad__content'>
          { NFT_PROJECTS.map(
            (project) => {
              return (
              <Card key={project.projectId} className='card__launchpad-project'>
                <LaunchPadProject project={project} userInfo={props.userInfo} updateUser={props.updateUser} />
              </Card>
              );
            })
          }
        </section>
      </Fragment>
    );
}

export default LaunchPad;