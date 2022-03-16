import './App.css';
import {useEffect, useState} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null
    });

    const [account, setAccount] = useState(null);

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            if(provider){
                setWeb3Api({
                    provider,
                    web3: new Web3(provider)
                });
            } else {
                console.log('No web3 provider found');
            }
        };
        loadProvider();
    }, []);

    //get accounts
    useEffect(() => {
        if(web3Api.web3){
            web3Api.web3.eth.getAccounts().then(accounts => {
                setAccount(accounts);
            });
        }
    }, [web3Api.web3]);

    //onclick connect wallet
    const connectWallet = () => {
        web3Api.provider.enable();
    };

  return (
    <div className="App">
      <div className="faucet-container">
        <div className="faucet-title mt-5">
          Current Balance: <span className="faucet-balance">0.00 ETH</span>
        </div>
          <div className="account-address"> Account address: {account ? account : "Not login"} </div>
          <button className="btn btn-primary" onClick={connectWallet}>Connect</button>
          <button className="btn btn-primary">Donate</button>
          <button className="btn btn-danger">Withdraw</button>
      </div>
    </div>
  );
}

export default App;
