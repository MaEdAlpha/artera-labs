import { Fragment, useState } from "react";
import "./ProposalItem.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import Modal from "../UI/Popup/Modal";
import VotePopup from "../UI/Popup/PopupTemplates/VotePopup";
import ProposalPopup from "../UI/Popup/PopupTemplates/ProposalPopup";
import useHttp from "../../hooks/use-http";
import { sourceURL } from "../../config/config";

const ProposalItem = (props) => {
  const [isVoting, setIsVoting] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  const [userVoted, setUserVoted ] = useState(false);

  const goVote = () => {
    setIsVoting(true);
  };

  const goReadMore = () => {
    setIsReading(true);
  };

  const finishReadingHandler = () => {
    setIsReading(false);
  };

  const closeVoteModal = () => {
    setIsVoting(false);
  };

  const finishedVoting = (isYes) => {
    const proposalData = {
      proposal: props.propTitle,
      castYesVote: isYes,
      strength: props.arteranVoteStrength,
      arterianAddr: props.walletAddr,
    };

    setUserVoted(true);

    const httpResponse = (res) => {
      console.log(res);
    };
    
    sendRequest(
      {
        url: sourceURL + "/cast",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { proposalData },
      },
      httpResponse
    );
    //sendRequest();
    setIsVoting(false);
  };

  const onCloseProposalHandler = () => {
    setIsReading(false);
  };

  return (
    <Fragment>
      <div className="proposal__wrapper">
        <h1>{props.propTitle}</h1>
        <p>{props.propContent}</p>
        <ProgressBar
          numerator={props.percentYes}
          denominator={1}
          isProposal={true}
        ></ProgressBar>
        <div className="proposal__buttons">
          <button className={props.hasSupported || userVoted ? "btn__artera btn__dark btn__disabled" : "btn__artera btn__dark" } onClick={goVote} disabled={props.hasSupported} >
            {props.hasSupported || userVoted ? 'VOTED' : 'VOTE'}
          </button>
          <button className="btn__artera btn__light" onClick={goReadMore}>
            READ MORE
          </button>
        </div>
      </div>
      {isVoting && (
        <Modal className="modal__vote-popup" onHide={closeVoteModal}>
          <VotePopup
            onVoted={finishedVoting}
            onCloseVoteModal={closeVoteModal}
          />
        </Modal>
      )}
      {isReading && (
        <Modal className="modal__proposal" onHide={finishReadingHandler}>
          <ProposalPopup
            title={props.propTitle}
            content={props.propContent}
            percentYes={props.percentYes}
            onVoted={finishedVoting}
            onCloseProposal={onCloseProposalHandler}
            hasSupported={props.hasSupported || userVoted }
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default ProposalItem;
