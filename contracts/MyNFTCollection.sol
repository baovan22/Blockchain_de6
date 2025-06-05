// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFTCollection is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    // Mapping để kiểm tra địa chỉ đã mint chưa
    mapping(address => bool) public hasMinted;
    
    // Số lượng NFT tối đa
    uint256 public maxSupply = 100;
    
    // Base URI cho metadata
    string private _baseTokenURI;

    constructor(string memory baseURI) ERC721("MyNFTCollection", "MNFT") {
        _baseTokenURI = baseURI;
    }
    
    // Ghi đè _baseURI để trả về base URI từ constructor
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    // Hàm mint NFT, chỉ 1 địa chỉ được mint 1 lần
    function safeMint(address to, string memory uri) public {
        require(!hasMinted[to], "Address already minted an NFT");
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        hasMinted[to] = true;
    }
    
    // Ghi đè supportsInterface để giải quyết xung đột đa kế thừa
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    // Ghi đè _burn theo yêu cầu đa kế thừa
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    // Ghi đè tokenURI theo yêu cầu đa kế thừa
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    // Kiểm tra địa chỉ đã mint NFT chưa
    function hasMintedNFT(address user) public view returns (bool) {
        return hasMinted[user];
    }
    
    // Lấy tổng số NFT đã mint
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
