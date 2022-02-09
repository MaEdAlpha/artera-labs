import Card from "../UI/Card/Card";
import "./Tag.css";
import TagDropDown from "./TagDropDown";
import { useState } from "react";
import Modal from "../UI/Popup/Modal";

const Tag = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const showAdditionalOptions = () => {
    setShowOptions((prevState) => {
      return !prevState;
    });
  };

  const enableWallet = () => {
    setShowOptions(false);
    props.connectWalletHandler();
  }

  return (
    <div className="tag__wrapper">
      {!props.account ? (
        <button className="tag__add-wallet" onClick={enableWallet}>
          <p className="tag__wallet-added-icon">+</p>
        </button>
      ) : (
        <div className="tag__wallet-added-wrapper">
          <button className="tag__wallet-added" onClick={showAdditionalOptions}>
           <p>Additional Functions</p>  <p className="tag__wallet-added-icon">+</p>
          </button>
          {showOptions && <TagDropDown onDisconnect={props.disconnect} addTokenHandler={props.addTokenHandler} />}
          {showOptions && <Modal onHide={showAdditionalOptions} className="modal__tag-dropdown"></Modal>}
        </div>
      )}
        {props.account ? (
          <Card className="card__tag">
            <p> {props.account} </p> 
          </Card>
        ) : ( 
          <Card className="card__tag larger">
            <p id='connect-wallet-text'>Connect Wallet</p>
          </Card>
        )} 
    </div>
  );
};

export default Tag;
