import { Fragment, useState } from "react";
import "./ProposalItem.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import Modal from "../UI/Popup/Modal";
import VotePopup from "../UI/Popup/PopupTemplates/VotePopup";
import ProposalPopup from "../UI/Popup/PopupTemplates/ProposalPopup";

const ProposalItem = (props) => {
  const [isVoting, setIsVoting] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const goVote = () => {
    setIsVoting(true);
  }

  const goReadMore = () =>{
    setIsReading(true);
  }

  const finishReadingHandler = () => {
    setIsReading(false);
  }

  const closeVoteModal = () => {
    setIsVoting(false);
  }

  const finishedVoting = (isYes) => {
    alert('User voted: ' + isYes);
    setIsVoting(false);
    //also, will make DB call through here.
  }

  const onCloseProposalHandler = () => {
    setIsReading(false);
  }

  return (
    <Fragment>
      <div className="proposal__wrapper">
        <h1>{props.propTitle}</h1>
        <p>{props.propContent}</p>
        <ProgressBar numerator={props.percentYes/100} denominator={1} isProposal={true}></ProgressBar>
        <div className="proposal__buttons">
          <button className="btn__artera btn__dark" onClick={goVote}>VOTE</button>
          <button className="btn__artera btn__light" onClick={goReadMore}>READ MORE</button>
        </div>
      </div>
      {isVoting && <Modal className="modal__vote-popup" onHide={closeVoteModal}><VotePopup onVoted={finishedVoting} onCloseVoteModal={closeVoteModal} /></Modal>}
      {isReading && <Modal className='modal__proposal' onHide={finishReadingHandler}><ProposalPopup title={props.propTitle} content={props.propContent} percentYes={props.percentYes/100} onVoted={finishedVoting} onCloseProposal={onCloseProposalHandler}/></Modal>}
    </Fragment>
  );
};

export default ProposalItem;
