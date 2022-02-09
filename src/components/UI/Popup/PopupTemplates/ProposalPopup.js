import './ProposalPopup.css';
import ProgressBar from '../../../ProgressBar/ProgressBar';
import {Fragment, useState} from 'react';
import Modal from '../Modal';
import VotePopup from './VotePopup';

const ProposalPopup = (props) => {
    const [isVoting, setVoteState] = useState(false);

    const displayVotePopup = () =>{
        setVoteState(true);
        //send vote strength to db
    }

    const closeVoteModal = () => {
        setVoteState(false);
        props.onCloseProposal();
        //send vote strength to db
    }

    const onOutsideModalClick = () => {
        setVoteState(false);
    }

    return (
        <Fragment>
            <div className="proposal-popup__container">
                <button className='proposal-popup__close' onClick={props.onCloseProposal}>X</button>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                <ProgressBar numerator={props.percentYes} denominator={1} isProposal={true}></ProgressBar>
                <button onClick={displayVotePopup} className={props.hasSupported ? "btn__artera btn__dark btn__disabled" : "btn__artera btn__dark" } disabled={props.hasSupported}>{props.hasSupported ? 'VOTED' : 'VOTE'}</button>
            </div>
            {isVoting && <Modal className="modal__vote-popup" onHide={onOutsideModalClick}><VotePopup onVoted={props.onVoted} onCloseVoteModal={closeVoteModal} /></Modal>}

        </Fragment>
    )
}

export default ProposalPopup;