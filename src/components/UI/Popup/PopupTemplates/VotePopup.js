import './VotePopup.css';

const VotePopup = (props) => {

    const votedYes = ()=>{
        props.onVoted(true);
        props.onCloseVoteModal();
    }

    const votedNo = ()=>{
        props.onVoted(false);
        props.onCloseVoteModal();
    }

    return(
        <div className='vote-popup__wrapper'>
            <p>What you vote for?</p>
            <div className='vote-popup__btn-wrapper'>
                <button className='btn__artera btn__light' onClick={votedYes}>YES</button>
                <button className='btn__artera btn__dark' onClick={votedNo}>NO</button>
            </div>
        </div>
    );
}

export default VotePopup;