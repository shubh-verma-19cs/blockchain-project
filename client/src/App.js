import React, { useEffect, useState } from "react";
import NFTs from "./contracts/NFTs.json";
import getWeb3 from "./getWeb3";

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Card from 'react-bootstrap/Card';
// import bg_image from './images/bg_image.png'

import "./App.css";

const App = () => {

  const [contract, setcontract] = useState(null);
  const [account, setAccount] = useState("");
  const [nft, setNFT] = useState([]);
  const [mintText, setMintText] = useState("");


  const loadNFTs = async (contract)=>{
    const totalSupply = await contract.methods.totalSupply().call();

    let tokens = [];
    for(let i=0; i<totalSupply; i++){
      let nft = await contract.methods.nfts(i).call();
      tokens.push(nft);
    }
    setNFT(tokens);
    console.log(tokens);
  }

  const loadWeb3Account = async(web3)=>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) =>{
    const networkID = await web3.eth.net.getId();
    const networkData = NFTs.networks[networkID];
    if(networkData){
      const abi = NFTs.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setcontract(contract);
      return contract;
    }
  }


  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    let contract = await loadWeb3Contract(web3);
    await loadNFTs(contract);
  }, [])


  const mint = () =>{
    contract.methods.mint(mintText).send({from: account}, (error)=>{
      console.log("done");
      if(!error){
        setNFT([...nft, mintText]);
        setMintText("");
      }
    })
  }

  return (
    
    <div className="background">

    <div>
    <Navbar>
    <Container className="justify-content-start" bg="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      NFT Marketplace
      </Navbar.Brand>
    </Container>

    <Container className="justify-content-end" bg="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      <span>{account}</span>
      </Navbar.Brand>
    </Container>
  </Navbar>
</div>

    <div className="container-fluid mt-5" >
      <div className="row">
        <div className="column d-flex flex-column align-items-center">
          <img src="https://avatars.dicebear.com/api/open-peeps/iokht.svg" className="mb-4" width="120px"/>
          <h1 className="display-5 fw-bold">
            NFT Marketplace
          </h1>
          <div className="col-6 text-center">
            <p className="lead text-center">
              This is an NFT Markeplace made for demonstrating the the knowledge in the fields of Blockchain and Web Development frameworks like ReactJS. 
            </p>
            <div className="">
            <input type="text" placeholder="Mint your NFT" className="form-control mb-2" value={mintText} onChange={(e)=>setMintText(e.target.value)}/>
            <button onClick={mint} className="btn btn-primary">Mint</button>
          </div>
          </div>

          <div className="col-8 d-flex justify-content-center ">
        {nft.map((nft, key)=> 
          <div className="d-flex flex-column align-items-center flex-wrap" key={key}>
            <img src={`https://avatars.dicebear.com/api/open-peeps/${nft}.svg`} width="100px" />
            <span>{nft}</span>
          </div>
        )}
        </div>
        </div>

      </div>

    </div>

    </div>
  )
}

export default App





// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(90).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

// export default App;
