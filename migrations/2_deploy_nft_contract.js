const NFT_Contract = artifacts.require("NFT");

module.exports = function(deployer){
    deployer.deploy(NFT_Contract);
}