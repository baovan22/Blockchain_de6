# NFT Collection Project

Dự án NFT Collection là một ứng dụng phân tán (DApp) cho phép người dùng mint và sở hữu NFT. Dự án bao gồm smart contract viết bằng Solidity và frontend sử dụng React.

## Tính năng

- Mint NFT độc đáo với metadata được lưu trữ trên IPFS
- Mỗi địa chỉ ví chỉ được mint 1 NFT
- Giới hạn tổng số lượng NFT có thể mint (100 NFT)
- Giao diện người dùng thân thiện với React
- Tích hợp với MetaMask để quản lý ví và giao dịch
- Hỗ trợ mạng thử nghiệm Sepolia

## Công nghệ sử dụng

- Solidity ^0.8.9
- Hardhat
- OpenZeppelin Contracts
- React.js
- ethers.js
- Web3.js
- IPFS (Pinata)

## Cài đặt và Chạy

### Yêu cầu

- Node.js (v14.0.0 hoặc cao hơn)
- npm hoặc yarn
- MetaMask wallet
- Sepolia ETH (có thể lấy từ faucet)

### Các bước cài đặt

1. Clone repository:
```bash
git clone https://github.com/baovan22/Blockchain_de6.git
cd Blockchain_de6
```

2. Cài đặt dependencies cho smart contract:
```bash
npm install
```

3. Cài đặt dependencies cho frontend:
```bash
cd frontend
npm install
```

4. Tạo file .env trong thư mục gốc và thêm các biến môi trường:
```
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
```

### Deploy Smart Contract

1. Compile smart contract:
```bash
npx hardhat compile
```

2. Deploy lên mạng Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Chạy Frontend

1. Chuyển đến thư mục frontend:
```bash
cd frontend
```

2. Khởi chạy ứng dụng:
```bash
npm start
```

Ứng dụng sẽ chạy tại http://localhost:3000

## Sử dụng

1. Kết nối MetaMask với ứng dụng
2. Chuyển sang mạng Sepolia
3. Đảm bảo có đủ Sepolia ETH trong ví
4. Chọn NFT muốn mint
5. Xác nhận giao dịch trong MetaMask

## Testing

Chạy test cho smart contract:
```bash
npx hardhat test
```

## Cấu trúc dự án

```
├── contracts/              # Smart contracts
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/        # Utility functions
│   │   └── artifacts/    # Contract ABIs
├── scripts/               # Deployment scripts
├── test/                 # Test files
└── hardhat.config.js     # Hardhat configuration
```

## License

MIT
