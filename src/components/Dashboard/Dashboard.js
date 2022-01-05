import React, { Fragment } from "react";
import "./Dashboard.css";
import Card from '../UI/Card/Card';
import DashBoardItem from './DashBoardItem';

import SectionTitle from "../UI/SectionTitle/SectionTitle";

const DashBoard = () => {
  const topText = "HELLO";
  const bottomText = "ARTERIAN";

  const ARTERIAN_STATS = [{
      item:'k1',
      topContent: 'YOUR $ARTYS BALANCE',
      middleContent: '455',
      bottomContent: 'TOKENS'
  }, 
  {
    item:'k2',
    topContent: 'VOTING POWER',
    middleContent: '5460',
    bottomContent: 'VOTES'
  }, 
  {
    item:'k3',
    topContent: 'YOU HAVE SUPPORTED',
    middleContent: '12',
    bottomContent: 'PROJECTS'
  }]

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
