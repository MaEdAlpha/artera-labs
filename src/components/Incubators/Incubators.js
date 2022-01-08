import React, { Fragment } from "react";
import "./Incubators.css";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import LaunchPadProject from "../LaunchPad/LaunchPadProject";
import Card from "../UI/Card/Card";

const Incubators = (props) => {
  const topText = "SUPPORT";
  const bottomText = "INCUBATORS";

  const NFT_INCUBATORS = [
    {
      id: 'i1',
      imgSrc: require("../../assets/img/metarooms.png"),
      artiste: 'phoenix team',
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      fundGoal:10000 ,
      fundedAmount:500,
    },
    {
      id: 'i2',
      imgSrc: require("../../assets/img/metarooms.png"),
      artiste: 'arterabulls',
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      fundGoal: 10000,
      fundedAmount: 8300,
    },
    {
      id: 'i3',
      imgSrc: require("../../assets/img/metarooms.png"),
      artiste: 'artbirds',
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      fundGoal: 10000,
      fundedAmount:1200,
    }]

  return (
    <Fragment>
      <SectionTitle
        className="section__incubators"
        header={topText}
        descriptor={bottomText}
      />
       <section className='launchpad__content'>
          { NFT_INCUBATORS.map(
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
};

export default Incubators;
