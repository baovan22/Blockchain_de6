const { ethers } = require("hardhat");

async function main() {
    try {
        // Tạo provider với RPC endpoint
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.gensy.network");
        
        // Kiểm tra network
        console.log("Đang kiểm tra kết nối...");
        
        // Lấy chain ID
        const network = await provider.getNetwork();
        console.log("Chain ID:", network.chainId);
        
        // Lấy block number hiện tại
        const blockNumber = await provider.getBlockNumber();
        console.log("Block hiện tại:", blockNumber);
        
        console.log("Kết nối thành công!");
    } catch (error) {
        console.error("Lỗi kết nối:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
