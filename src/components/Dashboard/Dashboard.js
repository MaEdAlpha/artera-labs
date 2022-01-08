import React, { Fragment } from "react";
import "./Dashboard.css";
import Card from '../UI/Card/Card';
import DashBoardItem from './DashBoardItem';

import SectionTitle from "../UI/SectionTitle/SectionTitle";

const DashBoard = (props) => {
  const topText = "HELLO";
  const bottomText = "ARTERIAN";

  //Possibly a cleaner way to handle this data, hardcode the html in and populate userModel via props. 
  const ARTERIAN_STATS = [
    {
    item:'s1',
    topContent: 'YOUR $ARTYS BALANCE',
    middleContent: props.userInfo.balance,
    bottomContent: 'TOKENS'
  }, 
  {
    item:'s2',  
    topContent: 'VOTING POWER',
    middleContent: props.userInfo.voteStrength,
    bottomContent: 'VOTES'
  }, 
  {
    item:'s3',
    topContent: 'YOU HAVE SUPPORTED',
    middleContent: props.userInfo.supportedProjects,
    bottomContent: 'PROJECTS'
    }];

  return (
    <Fragment>
      <SectionTitle
        className="section__dashboard"
        header={topText}
        descriptor={bottomText}
      />
      <section className="dashboard__content">
          { ARTERIAN_STATS.map(
              (stat) => {
                return(
                    <Card className='card__dashboard-item' key={stat.item}>
                        <DashBoardItem top={stat.topContent} middle={stat.middleContent} bottom={stat.bottomContent} />
                    </Card>
              );
            })
          }
      </section>
    </Fragment>
  );
};

export default DashBoard;
