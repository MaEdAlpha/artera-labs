import "./SupportPopup.css";
import SupportPopupInput from "../../Inputs/SupportPopupInput";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import TOKEN_ABI from "../../../../assets/tokenABI";
import useHttp from "../../../../hooks/use-http";
import { sourceURL } from "../../../../config/config";

const SupportPopup = (props) => {
  //Memory Leak here, close with useEffect cleanup function
  const [isDisabled, setDisabled] = useState(false);
  const [amountToSend, setAmountToSend] = useState(0);
  const { isLoading, error, sendRequest } = useHttp();
  
  useEffect(() => {
    return () => {
      setDisabled((prevValue) => { return prevValue});
      setAmountToSend((prevValue) => { return prevValue});
    };
  }, [isDisabled]); // add state as our dependency

  const handleSendTransaction = async (event) => {
    event.preventDefault();
    if (+amountToSend > 0 && +amountToSend <= props.balance) {

      setDisabled(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const arteraContract = new ethers.Contract(
        "0xAd4f4a18B0b568a313cf985Dce8a48a6037003cb",
        TOKEN_ABI,
        signer
      );

      const artsyDollar = ethers.utils.parseEther(amountToSend);

      await arteraContract
        .transfer(props.fundAddress, artsyDollar)
        .then((result) => {
          //Client side update, decoupled from backend response on nodeJS app. 
          const newBalance = props.userInfo.balance - +amountToSend;
          props.updateUser(newBalance, props.fundAddress); //updates userModel in App.js script
          updateBackend();
        });
    }
  };

  const updateBackend = () => {
    const transactionData = {
      tag: props.projectId,
      arterianAddr: props.userInfo.walletAddr,
      artiste: props.artiste,
      projectAddr: props.fundAddress,
      contributionAmount: +amountToSend,
      projectCount: +props.userInfo.supportedProjects === undefined ? 1 : +props.userInfo.supportedProjects,
    };

    const httpResponse = (res) => {
      console.info("Transaction Completed");
    };

    sendRequest(
      {
        url: sourceURL + "/contribute",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { transactionData },
      },
      httpResponse
    );
    setAmountToSend(0);
    setDisabled(false);
    props.onClose();
  };

  const setSupportInputAmount = (amount) => {
    setAmountToSend(amount);
  };

  return (
    <div className="popup__support">
      <p> SUPPORT {props.artiste}?</p>
      <h1>
        <SupportPopupInput
          setAmountToSendHandler={setSupportInputAmount}
          amount={amountToSend}
        />
      </h1>
      <button
        style={
          isDisabled
            ? { background: "grey", color: "#323232", transform: "scale(1.0)" }
            : { background: "white", color: "black", transform: "scale(1.0)" }
        }
        onClick={handleSendTransaction}
        disabled={isDisabled}
      >
        SUPPORT
      </button>
    </div>
  );
};

export default SupportPopup;
