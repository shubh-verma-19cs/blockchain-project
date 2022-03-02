const NFT_Contract = artifacts.require("NFT");

// const { before } = require("lodash");
let truffleAssert = require("truffle-assertions");

contract("NFT", (accounts)=> {
  let seller = accounts[0];
  console.log(seller);
  let nft;
  
  beforeEach(async()=>{
    nft = await NFT_Contract.new({from:seller});
  });

  it("should create an NFT", async ()=> {

    let transactionResult = await nft.createNFT("NFT #1", 1000000000000000);
    console.log(transactionResult);
    truffleAssert.eventEmitted(transactionResult, "NFTCreated", (event)=>{
      return event.name=="NFT #1" && event.id==1;
    });
    // return assert.isTrue(true);
  });

  // before(async()=>{
  //   nft = await NFT_Contract.deployed();
  // });

  // describe('nfts', async()=>{
  //   let result, nftCount

  //   before(async()=>{
  //     result = await nft.nft.createNFT("NFT #1", 1000000000000000000);
  //     nftCount = await nft.NFTCount();
  //   })

  //   it('should create an NFT', async()=>{
  //     truffleAssert.eventEmitted(transactionResult, "created", (event)=>{
  //         return event.name=="NFT #1";
  //       });
  //       return assert.isTrue(true);
  //   });
  // });
});