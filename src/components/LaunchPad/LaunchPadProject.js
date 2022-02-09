import React, { Fragment, useState } from "react";
import Modal from "../UI/Popup/Modal";
import Card from "../UI/Card/Card";
import SupportPopup from "../UI/Popup/PopupTemplates/SupportPopup";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./LaunchPadProject.css";

const LaunchPadProject = (props) => {
  
  const [displaySupport, setDisplaySupport] = useState(false);
  const [displayAcknowledgement, setDisplayAcknowledgement] = useState(false);
  const [readState, setReadState] = useState(false);
  const imgPath = require("../../assets/img/" + props.project.imgSrc + ".png");

  const showReadMoreModal = () => {
    setReadState(true);
  };

  const hideReadMoreModal = () => {
    setReadState(false);
  };

  const displaySupportModal = () => {
    setDisplaySupport((prevState) => {
      return !prevState;
    });
  };

  const hideSupportModal = () => {
    setDisplaySupport(false);
  };

  const hideSupportAfterPayment = () => {
    setDisplaySupport(false);
    setDisplayAcknowledgement(true);
  };

  const closeDisplayAcknowledgement = () => {
    setDisplayAcknowledgement(false);
  };

  return (
    <Fragment>
      <div className="project__wrapper">
        <div className="project__img">
          <img src={imgPath} alt={props.project.artiste}></img>
        </div>
        <div className="project__artiste">
          <h1>{props.project.artiste.toUpperCase()}</h1>
        </div>
        <div className="project__content">
          <p>{props.project.info}</p>
        </div>
        <div className="progress__container">
          <ProgressBar
            numerator={+props.project.fundedAmount}
            denominator={+props.project.fundGoal}
          />
        </div>
        <div className="project__buttons">
          <button
            className="btn__artera btn__light"
            onClick={displaySupportModal}>
            SUPPORT
          </button>
          <button className="btn__artera btn__dark" onClick={showReadMoreModal}>
            READ MORE
          </button>
        </div>
      </div>
      {displaySupport && (
        <Modal className="modal__support" onHide={hideSupportModal}>
          <SupportPopup
            projectId={props.project.projectId}
            artiste={props.project.artiste}
            balance={props.userInfo.balance}
            onClose={hideSupportAfterPayment}
            fundAddress={props.project.wallet}
            userInfo={props.userInfo}
            updateUser={props.updateUser}
          />
        </Modal>
      )}
      {readState && (
        <Modal onHide={hideReadMoreModal}>
          <Card className="popup__read-more popup__basic">
            <h1>{props.project.artiste.toUpperCase()}</h1>
            <p>{props.project.info}</p>
          </Card>
        </Modal>
      )}
      {displayAcknowledgement && (
        <Modal
          className="modal__acknowledge"
          onHide={closeDisplayAcknowledgement}>
          <p>Thank you for your support, confirmation from MetaMask will arrive
            shortly!</p>
        </Modal>
      )}
    </Fragment>
  );
};

export default LaunchPadProject;
