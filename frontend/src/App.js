import React, { useState, useEffect } from "react";
import { connectWallet, mintNFT, checkIfAddressHasMinted, getNFTsByOwner } from "./utils/interact";
import "./App.css";

// NFT images sample
const nftSamples = [
  { id: 1, name: "NFT #1", image: "/images/nft1.jpg" },
  { id: 2, name: "NFT #2", image: "/images/nft2.jpg" },
  { id: 3, name: "NFT #3", image: "/images/nft3.jpg" },
  { id: 4, name: "NFT #4", image: "/images/nft4.jpg" },
];

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [hasMinted, setHasMinted] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);

  useEffect(() => {
    // Khởi tạo ứng dụng
    const init = async () => {
      const { address, status } = await connectWallet();
      setWalletAddress(address);
      setStatus(status);
      
      if (address) {
        // Kiểm tra xem địa chỉ đã mint NFT chưa
        const minted = await checkIfAddressHasMinted(address);
        setHasMinted(minted);
        
        // Lấy NFT đã mint
        if (minted) {
          const nfts = await getNFTsByOwner(address);
          setMyNFTs(nfts);
        }
      }
    };
    
    init();
    
    // Lắng nghe sự kiện thay đổi tài khoản
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          init();
        } else {
          setWalletAddress("");
          setStatus("Connect to Metamask");
          setHasMinted(false);
          setMyNFTs([]);
        }
      });
    }
  }, []);

  const connectWalletPressed = async () => {
    const { address, status } = await connectWallet();
    setWalletAddress(address);
    setStatus(status);
    
    if (address) {
      const minted = await checkIfAddressHasMinted(address);
      setHasMinted(minted);
      
      if (minted) {
        const nfts = await getNFTsByOwner(address);
        setMyNFTs(nfts);
      }
    }
  };

  const onMintPressed = async () => {
    if (!selectedNFT) {
      setStatus("Please select an NFT first");
      return;
    }
    
    setLoading(true);
    setStatus("Minting your NFT...");
    
    try {
      // Tạo metadata
      const metadata = {
        name: selectedNFT.name,
        description: `A unique NFT from MyNFTCollection`,
        image: `https://your-api.com/images/nft${selectedNFT.id}.jpg`,
        attributes: [
          { trait_type: "Collection", value: "MyNFTCollection" },
          { trait_type: "Number", value: selectedNFT.id }
        ]
      };
      
      // Trong thực tế, bạn sẽ upload metadata lên IPFS hoặc server của bạn
      // Ở đây, chúng ta giả định URL metadata
      const metadataURI = `ipfs://QmYourIPFSHash/metadata${selectedNFT.id}.json`;
      
      // Mint NFT
      const { success, status } = await mintNFT(metadataURI);
      setStatus(status);
      
      if (success) {
        setHasMinted(true);
        const nfts = await getNFTsByOwner(walletAddress);
        setMyNFTs(nfts);
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      setStatus("Error minting NFT: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Collection Minting</h1>
        <p className="subtitle">Mint your unique NFT</p>
        
        {walletAddress ? (
          <p className="wallet-address">
            Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
          </p>
        ) : (
          <button onClick={connectWalletPressed} className="connect-wallet-button">
            Connect Wallet
          </button>
        )}
        
        {status && <p className="status">{status}</p>}
      </header>
      
      <main>
        {walletAddress && !hasMinted ? (
          <div className="mint-section">
            <h2>Select an NFT to Mint</h2>
            <div className="nft-grid">
              {nftSamples.map(nft => (
                <div 
                  key={nft.id} 
                  className={`nft-card ${selectedNFT?.id === nft.id ? 'selected' : ''}`}
                  onClick={() => setSelectedNFT(nft)}
                >
                  <img src={nft.image} alt={nft.name} />
                  <h3>{nft.name}</h3>
                </div>
              ))}
            </div>
            
            <button 
              onClick={onMintPressed} 
              disabled={!selectedNFT || loading} 
              className="mint-button"
            >
              {loading ? "Processing..." : "Mint NFT"}
            </button>
          </div>
        ) : null}
        
        {walletAddress && hasMinted ? (
          <div className="my-nfts-section">
            <h2>Your NFT Collection</h2>
            {myNFTs.length > 0 ? (
              <div className="nft-grid">
                {myNFTs.map(nft => (
                  <div key={nft.id} className="nft-card">
                    <img src={`https://gateway.pinata.cloud/ipfs/${nft.uri.replace('ipfs://', '')}`} alt={`NFT #${nft.id}`} />
                    <h3>NFT #{nft.id}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading your NFTs...</p>
            )}
          </div>
        ) : null}
      </main>
      
      <footer>
        <p>© 2025 MyNFTCollection - ERC721 Standard</p>
      </footer>
    </div>
  );
}

export default App;