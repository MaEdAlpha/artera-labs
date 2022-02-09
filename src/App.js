import React, { useState, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import detectEthereumProvider from "@metamask/detect-provider";
import "./App.css";

import SideNav from "./components/SideNav/SideNav";
import Tag from "./components/Tag/Tag";
import DashBoard from "./components/Dashboard/Dashboard";
import LaunchPad from "./components/LaunchPad/LaunchPad";
import Governance from "./components/Governance/Governance";
import Applications from "./components/Applications/Applications";
import Claims from "./components/Claims/Claims";
import useHttp from "./hooks/use-http";
import useArtera from "./hooks/use-artera";
import { sourceURL } from "./config/config";

function App() {
  const [contentSelect, setContentSelect] = useState(0);

  const [arteraBalance, setArteraBalance] = useState(0);
  const [projectContrib, setProjectContrib] = useState(0);
  const [projectLaunchPad, setProjectLaunchPad] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [supportedProposals, setSupportedProposals] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const { usersArtera, getBalance } = useArtera();
  const { isLoading, error, sendRequest } = useHttp();

  //useDapp API
  const { activateBrowserWallet, account, deactivate } = useEthers();

  let userModel = useRef(null);

  useEffect(() => {
    if (window.ethereum) {
      //need to handle this event to prevent leaks, each refresh adds multiple event listners to the window.ethereum.on('accountsChanged'...).
      window.ethereum.on("accountsChanged", function (accounts) {
        setDefaultAddress(accounts);
        if (account !== undefined) {
          alert("Alert: Account change detected.");
        }
        window.location.reload();
      });
    }

    return () => {
      setDefaultAddress(null);
    };
  }, [account]);

  //Setting MetaMask Credentials
  useEffect(() => {
    if (account === undefined) {
      setArteraBalance(0);
    }

    if (usersArtera !== undefined && account) {
      //console.log(+usersArtera);
      setArteraBalance(+usersArtera);
      setDefaultAddress(window.ethereum.selectedAddress);
    }
  }, [account, usersArtera]);

  //backend API call for User Projects + Proposal Data
  useEffect(() => {
    const projectData = (httpResponse) => {
      let filteredProposals = [];

      const filteredProjects = httpResponse.body.filter((document) => {
        if (document.projectId) {
          return true;
        } else {
          filteredProposals.push(document);
          return false;
        }
      });

      setProjectLaunchPad(filteredProjects);
      setProposals(filteredProposals);
    };

    sendRequest({ url: sourceURL + "/projects" }, projectData);

    if (defaultAddress != null) {
      const encodedValue = encodeURIComponent(defaultAddress);
      //custom-hook function that returns httpResponse
      const userData = (httpResponse) => {
        //console.log(httpResponse);

        const isActiveUser = httpResponse.isActive;

        if (isActiveUser) {
          const projectContribCount =
            httpResponse.data.supported_projects.filter(function findUniqueKeys(
              el
            ) {
              const key = el.proj;
              return !this.has(key) && this.add(key);
            },
            new Set());

          isActiveUser
            ? setProjectContrib(projectContribCount)
            : setProjectContrib([]);
          isActiveUser
            ? setSupportedProposals(httpResponse.data.supported_proposal)
            : setSupportedProposals([]);
        }
      };
      sendRequest({ url: sourceURL + `/user/${encodedValue}` }, userData);
    }
  }, [sendRequest, defaultAddress]);

  //Setting Stream for changes to Projects or Proposals.
  useEffect(() => {
    const sse = new EventSource(sourceURL + `/stream`, {
      withCredentials: true,
    });

    function getRealtimeData(data) {
      if (data.event === "PROJECT") {
        setProjectLaunchPad((previousValue) => {
          return (previousValue = previousValue.filter((proj) => {
            if (proj.artiste === data.artiste) {
              proj.fundedAmount = data.totalContribution;
              return true;
            }
            return true;
          }));
        });
        //console.log("PROJECT: ", data.event)
      }
      if (data.event === "PROPOSAL") {
        setProposals((previousValue) => {
          return (previousValue = previousValue.filter((proposal) => {
            if (proposal.propTag === data.propTag) {
              proposal.yesVoteStrength = data.yesVotes;
              proposal.totalVoteStrength = data.totalVoteStrength;
              proposal.totalVotes = data.totalVotes;
              return true;
            }
            return true;
          }));
        });

        console.info("Proposal", data);
      }
    }
    sse.onmessage = (e) => {
      if (e.data !== "heartbeat") {
        getRealtimeData(JSON.parse(e.data));
      }
    };
    sse.onerror = (err) => {
      // error log here
      //console.log(err);
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, [setProjectLaunchPad, setProposals]);

  const setAttributes = () => {
    userModel.current = {
      balance: arteraBalance,
      voteStrength: arteraBalance * 12,
      supportedProjects:
        projectContrib !== undefined ? projectContrib.length : 0,
      walletAddr: defaultAddress,
    };
  };

  //Use another JS file you make your HTTP requests to retrieve data, and populate this property. Move to another file later.

  const updateUserModelHandler = (newBalance, projectWallet) => {
    getBalance().then(() => {
      setAttributes();
    });
    if (projectContrib !== 0) {
      console.log(projectContrib);
      const userAlreadySupported = projectContrib.filter(
        (project) => projectWallet === project.wallet
      );
      if (userAlreadySupported.length > 0)
        setProjectContrib((prevValue) =>
          prevValue.push({ placeholder: "for contrib count" })
        );
    } else {
      setProjectContrib([{ event: "placeholder" }]);
    }
  };

  const displayContentOnClick = (event) => {
    setContentSelect(event.target.value);
  };

  const walletConnection = async () => {
    if (!window.ethereum)
      alert(
        "MetaMask must be installed to use this site, please visit https://metamask.io/ to download the extension."
      );
    activateBrowserWallet();
  };

  const onDetachWallet = () => {
    deactivate();
  };

  //CURRENTLY STILL SET TO MVR network. Change when you have actual token
  async function addTokenFunction() {
    const provider = await detectEthereumProvider();

    try {
      await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xAd4f4a18B0b568a313cf985Dce8a48a6037003cb", //contract address?
            symbol: "DARTSY",
            decimals: 0,
            image: "",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  setAttributes();
  getBalance();

  return (
    <React.Fragment>
      <Tag
        connectWalletHandler={walletConnection}
        addTokenHandler={addTokenFunction}
        disconnect={onDetachWallet}
        account={account}
      />
      <div className="site__wrapper">
        <SideNav
          dispalyContentHandler={displayContentOnClick}
          selectedNav={contentSelect}
        />
        <div className="site__content">
          <Switch>
            <Route path="/launch-pad">
              {
                <LaunchPad
                  userInfo={userModel.current !== null && userModel.current}
                  updateUser={updateUserModelHandler}
                  projects={projectLaunchPad}
                />
              }
            </Route>
            <Route path="/governance">
              {
                <Governance
                  proposals={proposals}
                  arteranVoteStrength={userModel.current.voteStrength}
                  walletAddr={userModel.current.walletAddr}
                  supported={supportedProposals}
                />
              }
            </Route>
            <Route path="/applications">
              <Applications />
            </Route>
            <Route path="/claims">
              <Claims walletAddr={userModel.current.walletAddr}></Claims>
            </Route>
            <Route path="/">
              <DashBoard
                userInfo={userModel.current !== null && userModel.current}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
