import React, { Fragment } from "react";
import "./Dashboard.css";

import SectionTitle from "../UI/SectionTitle/SectionTitle";

const DashBoard = () => {
  const topText = "HELLO";
  const bottomText = "ARTERIAN";

  return (
    <Fragment>
      <SectionTitle
        className="section__dashboard"
        header={topText}
        descriptor={bottomText}
      />
    </Fragment>
  );
};

export default DashBoard;
