const { Web3 } = require("web3");
const Abi = require("./ABI.json");
const dotenvenc = require('@chainlink/env-enc');
dotenvenc.config();

const contractAddress = "0xAA185c64E4aE21907Bbc5363e064BC7314A20b4D";

const smartContract = async () => {
  const provider = process.env.SEPOLIA_RPC_URL;
  const web3 = new Web3(provider);

  const privateKey = process.env.PRIVATE_KEY;
  const privateKeyHex = '0x' + privateKey;

  const sender = web3.eth.accounts.privateKeyToAccount(privateKeyHex).address;
  web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(privateKeyHex));

  const contractInstance = new web3.eth.Contract(Abi, contractAddress);

  const to = "0x2e8E610Aff4ee99A3e2cE5e366f4f437EB63524a";
  const amount = "1000000000000000000";

  const transaction = {
    from: sender,
    to: contractAddress,
    data: contractInstance.methods.transfer(to, amount).encodeABI(),
    gas: '300000', // Use the estimated gas
  };

  await web3.eth.sendTransaction(transaction);
  console.log("Jay Shree Ram.");
};

smartContract();
