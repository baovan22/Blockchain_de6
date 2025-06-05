const { ethers } = require("hardhat");

async function main() {
    const urls = [
        "https://rpc.gensy.top",
        "http://rpc.gensy.top:8545",
        "https://gensyn-testnet.g.alchemy.com/public"
    ];

    for (const url of urls) {
        try {
            console.log(`\nKiểm tra kết nối đến ${url}...`);
            const provider = new ethers.providers.JsonRpcProvider(url);
            
            // Kiểm tra chainId
            const chainId = await provider.send("eth_chainId", []);
            console.log("Chain ID:", parseInt(chainId, 16));
            
            // Kiểm tra block mới nhất
            const blockNumber = await provider.getBlockNumber();
            console.log("Block số mới nhất:", blockNumber);
            
            // Kiểm tra network
            const network = await provider.getNetwork();
            console.log("Thông tin mạng:", network);
            
            console.log("✅ Kết nối thành công!");
        } catch (error) {
            console.error("❌ Lỗi kết nối:", error.message);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
