
const NFTs = artifacts.require("./NFTs.sol");

contract("NFTs", accounts => {

  let contract;
  before(async ()=>{
    contract = await NFTs.deployed();
  })

  it("...should get deployed.", async () => {
    assert.notEqual(contract, "");


  });

  it("...should get minted.", async ()=>{
    const result = await contract.mint("NFT1");
    let nft = await contract.nfts(0);

    console.log(nft);
  });
});
