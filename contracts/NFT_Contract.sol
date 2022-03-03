// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract NFT{
    string public name;

    struct NFTOnSale{
        uint p_id;
        string name;
        uint price;
        address payable owner;
        // uint unq_id;
        bool purchased;
    }

    event NFTCreated(
        uint id, string name, uint price, address payable owner, bool purchased
    );

    event ProductPurchased(
    uint id, string name, uint price, address payable owner, bool purchased
    );

    uint public NFTCount = 0;
    mapping(uint=>NFTOnSale) public NFTs;

    function createNFT(string memory nft_name, uint nft_price) public{
        require(nft_price>0);
        NFTCount++;
        NFTs[NFTCount] = NFTOnSale(NFTCount, nft_name, nft_price, payable(msg.sender), false);
        emit NFTCreated(NFTCount, nft_name, nft_price, payable(msg.sender), false);
    }

    function purchaseNFT(uint nft_id) public payable{
        NFTOnSale memory _nft = NFTs[nft_id];
        address payable _seller = _nft.owner;
        require(_nft.p_id>0 && _nft.p_id<=NFTCount);
        require(msg.value >= _nft.price);
        require(!_nft.purchased);
        require(_seller!=msg.sender);
        _nft.owner = payable(msg.sender);
        _nft.purchased = true;
        NFTs[nft_id] = _nft;

        payable(address(_seller)).transfer(msg.value);

        emit ProductPurchased(NFTCount, _nft.name, _nft.price, payable(msg.sender), true);

    }

    constructor() public{
        name = "NFT Smart Contract";
    }
}