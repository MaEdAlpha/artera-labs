import React, { Fragment, useEffect, useState } from "react";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import Modal from "../UI/Popup/Modal";
import { sourceURL } from "../../config/config";
import useHttp from "../../hooks/use-http";
import "./Claims.css";

const Claims = (props) => {
  //states and hooks
  const [KSMAddr, setKSMAddr] = useState("KSM ADDRESS");
  const [isDisabledSubmission, setIsDisabledSubmission] = useState(true);
  const [displayClaimsResults, setDisplayClaimsResults] = useState(false);
  const [confirmationValue, setConfirmationValue] = useState(null);
  const [inputErrorMessage, setInputErrorMessage] = useState(null);
  const [displayFAQ, setDisplayFAQ] = useState(false);
  const [KSMAddrTouched, setKSMAddrTouched ] = useState(false);
  const { sendRequest } = useHttp();
  
  //header info
  const topText = "CLAIM";
  const bottomText = "&USE";

  //dynamic styles
  const buttonClass = isDisabledSubmission  ? "btn__artera btn__lighter btn__claims btn__claims_disabled" : `btn__artera btn__lighter btn__claims `;

  useEffect(()=>{
    if(KSMAddrTouched){
      if(props.walletAddr === null) setInputErrorMessage('Please sign into your MM wallet to proceed.');
    }
  }, [KSMAddrTouched, props.walletAddr]);

  const popUpFAQ = () => {
    setDisplayFAQ(true);
  };

  const finishedReadingHandler = () => {
    setDisplayFAQ(false);
  };

  const closePopup = () => {
    setDisplayClaimsResults(false);
  }

  const submitAddr = (event) => {
    event.preventDefault();
    console.log(KSMAddr);

    const httpResponse = (res => {
      if(res.bueno){
        //show popup saying deposit this 
        setConfirmationValue('0.000000000'+ res.confirmationID);
        setKSMAddr('Success!');
        setDisplayClaimsResults(true);
      } else {
        //try again or contact support.
        setKSMAddr('Try Again!');
        setDisplayClaimsResults(true);
      }
      setIsDisabledSubmission(true);
    });

    sendRequest(
      {
        url: sourceURL + "/claims",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          ksmAddr: KSMAddr,
          mmAddr: props.walletAddr
        },
      },
      httpResponse
    );
  };

  const setAddr = (inputValue) => {

    if(props.walletAddr === null){
      setKSMAddrTouched(true);
      return;
    }

    if (inputValue.trim() === "") {
      setIsDisabledSubmission(true);
      setInputErrorMessage(null);
      setKSMAddr("");
      return;
    }

    if (  inputValue.length !== 47 || inputValue.includes("<") ) {
      setInputErrorMessage("Invalid entry, please enter a valid KSM address.");
      setIsDisabledSubmission(true);
      setKSMAddr(inputValue);
      return;
    } else {
      setIsDisabledSubmission(false);
      setInputErrorMessage(null);
      setKSMAddr(inputValue);
      return;
    }
  };
  return (
    <Fragment>
      <SectionTitle
        className="section__dashboard"
        header={topText}
        descriptor={bottomText}
      />
      <section className="claims__content">
        <div className="claims__top claims__box">
          <p>
            <span className="top__bigger_text">
              PLEASE INSERT YOUR KSM ADDRESS
            </span>
            <br />
            <span className="top__smaller_text">
              It should be exactly the same holding of arterlabs NFTS or Kanaria
              Birds. <br />
              (Check that the network is Kusama and not Polkadot)
            </span>
          </p>
        </div>
        <div className="claims__middle claims__box">
          <div className="claims__middle-input">
            <input
              className="claims__input"
              type="text"
              value={KSMAddr}
              onChange={(e) => {setAddr(e.target.value); }}
              onBlur={ () => {setKSMAddrTouched(true)}}
              required
              autoFocus
            />
          </div>
          <p className="claims__middle-error">
            {isDisabledSubmission && inputErrorMessage}
          </p>
        </div>
        <div className="claims__bottom claims__box">
          <button
            className="btn__artera btn__white btn__claims"
            onClick={popUpFAQ}
          >
            FAQ
          </button>
          <button
            className={buttonClass}
            onClick={submitAddr}
            disabled={isDisabledSubmission}
          >
            CHECK
          </button>
        </div>
      </section>
      {displayFAQ && (
        <Modal className="modal__faq" onHide={finishedReadingHandler}>
          <h1>FAQ</h1>
          <ul className="faq__ul">
            <li>WHAT IS METAMASK?</li>
            <li>WHAT IS MOONRIVER?</li>
            <li>WHY MOONRIVER?</li>
            <li>WHO IS ELIGIBLE FOR THE DROP?</li>
            <li>HOW LONG IS THE DROP AVAiLABLE?</li>
            <li>WHAT HAPPENS AFTER THE TiME iS OVER?</li>
            <li>HOW MANY TOKENS I WILL RECIEVE?</li>
            <li>WILL THERE BE ANY OTHER DROP?</li>
            <li>HOW CAN I PARTICIPATE TO THE NEXT DROP?</li>
            <li>I AM SURE THAT I AM ELIGABLE, BUT</li>
            <li>SYSTEM SAYS NOT, WHAT SHOULD I DO?</li>
          </ul>
        </Modal>
      )}
      {displayClaimsResults && (
        <Modal className="modal__check-claims" onHide = {null}>
          
          { KSMAddr === 'Success!' ? 
            
              <div className="claims__succeed">
                <p className="claims__text-large">Please transfer <span className="claims_highlight">Exact amount</span> to <br/> the ArteraLabs claiming wallet</p>
                <p className="claims__text-smallest"><br/> Once the confirmation is checked, you will recieve your tokens on this MetaMask wallet. <br/><br/></p> 
                <p className="claims__text-largest">{confirmationValue}<br/></p>
                <p className="claims__text-normal"><br/>Send to: ABCDEFGHIJKLMNOPQRSTUVWKYZ <br/><br/></p>
                <button className='btn__artera btn__dark' onClick={closePopup}>Okay</button>
              </div>
              :
              <div className="claims__failed">
                <p>Please try again, or contact us on Discord for further assistance.</p>
                <button className='btn__artera btn__dark' onClick={closePopup}>Okay</button>
              </div>

          }    
        </Modal>
      )}
    </Fragment>
  );
};

export default Claims;
