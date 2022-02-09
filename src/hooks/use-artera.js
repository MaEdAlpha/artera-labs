import { useState, useCallback } from "react";
import { ethers } from 'ethers';
import TOKEN_ABI from "../assets/tokenABI";

const useArtera = () => {
  const [usersArtera, setAccounts] = useState();

  const getBalance =  useCallback(async () => {

    const ethEnabled = async () => {

      if (typeof window.ethereum !== 'undefined') {
        
        try {
          // Request account access
          //Creates provider and signer objects to retrieve balance of Artera Contract
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const arteraContract = new ethers.Contract('0xAd4f4a18B0b568a313cf985Dce8a48a6037003cb', TOKEN_ABI, signer);
          const arteraBalance = ethers.utils.formatUnits(await arteraContract.balanceOf(signer.getAddress()));
          //console.log('Signer balance: ', arteraBalance);
          await window.ethereum.request({method:'eth_requestAccounts'});
          setAccounts(arteraBalance);
          return true
        } catch (e) {
          // User denied access
          return false
        } finally {
          return null;
        }
      }
      return null;
    }
     ethEnabled();
  },[]);
    return {usersArtera, getBalance}
}

export default useArtera;
