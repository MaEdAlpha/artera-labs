import './SupportPopup.css';

const SupportPopup = (props) => {
    const doTheThing = () => {
        props.onClose();
        alert('We just went!');
    }

    //Logic for DB write possibly goes here

    return(<div className="popup__support">
        <p> HOW STRONG SHOULD YOUR SUPPORT BE?</p>
        <h1> {props.strength} </h1>
        <button onClick={doTheThing}>SUPPORT</button>
    </div>)
};

export default SupportPopup;