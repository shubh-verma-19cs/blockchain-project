// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract NFT{
    string public name;

    struct NFTOnSale{
        uint p_id;
        string name;
        uint price;
        address payable owner;
        uint unq_id;
        bool purchased;
    }

    event NFTCreated(
        uint id, string name, uint price, address payable owner, uint unq_id, bool purchased
    );

    uint public NFTCount = 0;
    mapping(uint=>NFTOnSale) public NFTs;

    function createNFT(string memory nft_name, uint nft_price) public{
        require(nft_price>0);
        NFTCount++;
        NFTs[NFTCount] = NFTOnSale(NFTCount, nft_name, nft_price, payable(msg.sender), block.timestamp,  false);
        emit NFTCreated(NFTCount, nft_name, nft_price, payable(msg.sender), block.timestamp, false);
    }

    // function purchaseNFT()

    constructor() public{
        name = "NFT Smart Contract";
    }
}