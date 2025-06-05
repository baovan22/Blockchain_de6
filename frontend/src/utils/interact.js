import { ethers } from "ethers";
import MyNFTCollection from "../artifacts/contracts/MyNFTCollection.sol/MyNFTCollection.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// Kết nối đến provider
const getProvider = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  throw new Error("No Ethereum provider found");
};

// Lấy contract instance
const getContract = async () => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, MyNFTCollection.abi, signer);
};

// Kiểm tra ví đã kết nối chưa
export const connectWallet = async () => {
  try {
    const provider = await getProvider();
    const accounts = await provider.listAccounts();
    return {
      address: accounts[0],
      status: "Connected to wallet"
    };
  } catch (err) {
    return {
      address: "",
      status: err.message
    };
  }
};

// Kiểm tra xem địa chỉ đã mint NFT chưa
export const checkIfAddressHasMinted = async (address) => {
  try {
    const contract = await getContract();
    const hasMinted = await contract.hasMintedNFT(address);
    return hasMinted;
  } catch (err) {
    console.error("Error checking mint status:", err);
    return false;
  }
};

// Lấy NFT đã mint bởi địa chỉ
export const getNFTsByOwner = async (address) => {
  try {
    const contract = await getContract();
    const totalSupply = await contract.totalSupply();
    
    let ownedNFTs = [];
    
    for (let i = 0; i < totalSupply; i++) {
      try {
        const owner = await contract.ownerOf(i);
        if (owner.toLowerCase() === address.toLowerCase()) {
          const tokenURI = await contract.tokenURI(i);
          ownedNFTs.push({
            id: i,
            uri: tokenURI
          });
        }
      } catch (e) {
        console.log("Error checking token:", i, e);
      }
    }
    
    return ownedNFTs;
  } catch (err) {
    console.error("Error getting NFTs:", err);
    return [];
  }
};

// Mint NFT
export const mintNFT = async (metadataURI) => {
  try {
    const contract = await getContract();
    const provider = await getProvider();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    // Kiểm tra xem địa chỉ đã mint chưa
    const hasMinted = await contract.hasMintedNFT(address);
    if (hasMinted) {
      return {
        success: false,
        status: "You have already minted an NFT"
      };
    }
    
    // Mint NFT
    const transaction = await contract.safeMint(address, metadataURI);
    await transaction.wait();
    
    return {
      success: true,
      status: "NFT minted successfully!"
    };
  } catch (err) {
    return {
      success: false,
      status: "Error minting NFT: " + err.message
    };
  }
};