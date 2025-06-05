const hre = require("hardhat");

async function main() {
  // Base URI cho metadata (IPFS gateway hoặc API của bạn)
  const baseURI = "https://gateway.pinata.cloud/ipfs/";
  
  // Deploy contract
  const MyNFTCollection = await hre.ethers.getContractFactory("MyNFTCollection");
  const myNFTCollection = await MyNFTCollection.deploy(baseURI);

  await myNFTCollection.deployed();

  console.log("MyNFTCollection deployed to:", myNFTCollection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });