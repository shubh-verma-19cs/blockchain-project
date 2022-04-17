var NFTs = artifacts.require("./NFTs.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTs);
};
