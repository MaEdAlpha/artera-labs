import React, { Fragment } from 'react';
import './LaunchPad.css';

import LaunchPadProject from './LaunchPadProject';
import SectionTitle from '../UI/SectionTitle/SectionTitle';
import Card from '../UI/Card/Card';

const LaunchPad = (props) =>{
    const topText = "KICKSTARTING";
    const bottomText = "NFT PROJECTS";
    //Place in separate folder with HTTP request to DB to get recent projects.
    const NFT_PROJECTS = [
      {
        id: 'a1',
        imgSrc: require("../../assets/img/devilla.png"),
        artiste: 'devilla',
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        fundGoal:10000 ,
        fundedAmount:1800,
      },
      {
        id: 'a2',
        imgSrc: require("../../assets/img/heiley.png"),
        artiste: 'heiley',
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        fundGoal: 10000,
        fundedAmount: 3300,
      },
      {
        id: 'a3',
        imgSrc: require("../../assets/img/rolphy.png"),
        artiste: 'rolphy',
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        fundGoal: 10000,
        fundedAmount:100,
      },
      {
        id: 'a4',
        imgSrc: require("../../assets/img/synopsis.png"),
        artiste: 'sakamu',
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        fundGoal: 10000,
        fundedAmount:9999,
      },
      {
        id: 'a5',
        imgSrc: require("../../assets/img/tenderbits.png"),
        artiste: 'tenderbits',
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        fundGoal: 10000,
        fundedAmount: 6000,
      },
    ];
  
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
              <Card key={project.id} className='card__launchpad-project'>
                <LaunchPadProject project={project} userInfo={props.userInfo} />
              </Card>
              );
            })
          }
        </section>
      </Fragment>
    );
}

export default LaunchPad;