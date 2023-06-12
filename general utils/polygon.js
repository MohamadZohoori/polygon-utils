const Web3 = require("web3");
const alchemy = require('alchemy-sdk')

const testnet_provider = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';
const web3_testnet = new Web3(new Web3.providers.HttpProvider(testnet_provider));

function createAccount(web3){
  return web3.eth.accounts.create();
}


function AddAccountToWallet(accountAddress, web3){
  web3.eth.accounts.wallet.add(accountAddress)
}

function getPubKeyFromWallet(wallet){
  console.log(wallet.address)
  return wallet.address
}


function privateKeyToAccount(privateKey, web3){
  let wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log(wallet)
  return wallet
}


async function transferPolygon(provider, signerPrivateKey, receiverAddress, amount) {

  const web3 = new Web3(new Web3.providers.HttpProvider(provider));

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(signerPrivateKey);
 
  web3.eth.accounts.wallet.add(signer);
  // Creating the transaction object

  const tx = {
    from: signer.address,
    to: receiverAddress,
    value: web3.utils.toWei(amount),
  };
  console.log(`tx: ${tx}`);
  // Assigning the right amount of gas
  tx.gas = await web3.eth.estimateGas(tx);
  console.log(`gas: ${tx.gas}`);
  const balance = await web3.eth.getBalance(signer.address)
  console.log(`balance: ${balance}`);
  //  Sending the transaction to the network
  const receipt = await web3.eth.sendTransaction(tx)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`Transaction hash: ${txhash}`);
    });
  // The transaction is now on chain!
  console.log(receipt)
  console.log(`Mined in block ${receipt.blockNumber}`);
}



async function PolygonBalance(provider, Address) {
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));
  const balance = await web3.eth.getBalance(Address)
  console.log(`balance: ${balance}`);
  return balance;
}



async function GasFeePolygonTransfer(provider, signerPrivateKey, receiverAddress, amount){
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(signerPrivateKey);
 
  web3.eth.accounts.wallet.add(signer);
  // Creating the transaction object

  const tx = {
    from: signer.address,
    to: receiverAddress,
    value: web3.utils.toWei(amount),
  };

  // Assigning the right amount of gas
  tx.gas = await web3.eth.estimateGas(tx);
  console.log(`gas: ${tx.gas}`);  
  return tx.gas
}


async function eventLogOfAddress(AccountAddress, ApiKey){

  const settings = {
      apiKey: ApiKey,
      network: alchemy.Network.MATIC_MUMBAI,
  };

  const alch = new alchemy.Alchemy(settings);

  // Get the latest block
  const latestBlock = alch.core.getBlockNumber();

  // Get all outbound transfers for a provided address
  alch.core
      .getTokenBalances(AccountAddress)
      .then(console.log);

  // Listen to all new pending transactions
  alch.ws.on(
      { method: "alchemy_pendingTransactions",
      fromAddress: AccountAddress },
      (res) => console.log(res)
  );
}




async function AllofTheBalances(AccountAddress, ApiKey) {
  const settings = {
    apiKey: ApiKey,
    network: alchemy.Network.MATIC_MUMBAI,
  };
  const alch = new alchemy.Alchemy(settings);

  // Get the latest block
  const latestBlock = alch.core.getBlockNumber();

  // Get all outbound transfers for a provided address
  alch.core.getTokenBalances(AccountAddress).then(console.log);

}


// Guidelines:

// 1. Turn on VPN for Transactions and Connecting to Polygon Network.
// 2. The Token Transfer is in a separate project folder.
// 3. For the event logs function you can get your own api key from the Alchemy website


// // Testing eventLogOfAddress for events of a specific accountAddress for both Polygon and network tokens

// const AccountAddress = '0x429D5f671c77ccc6Dbea325882Baad7cA5a19df1'
// const ApiKey = "uYlaYhwl6E9hfR-E1U-_ytuEt7-oJ8As"
// eventLogOfAddress(AccountAddress, ApiKey)


// // Testing Create Account

// const account = createAccount(web3_testnet);
// const accountAddress = account.address;
// const accountPrivateKey = account.privateKey;
// console.log(`account: ${account}, pubKey: ${accountAddress}, private-Key: ${accountPrivateKey}`);



// // Testing AllofTheBalances

// const Address = '0x429D5f671c77ccc6Dbea325882Baad7cA5a19df1'
// const APIKey = "uYlaYhwl6E9hfR-E1U-_ytuEt7-oJ8As"
// AllofTheBalances( Address, APIKey)



// // Testing Polygon Transfer

// amount should not be in Wei !!!!
// const amount = "0.1";
// const signerPrivateKey = '4d5dce7cd894bb37b6718d29c0fc06e57d47b45daa54a6c03f7fb5d672d0f0fc';
// const receiverAddress = "0x6b129015863f065eDfF62359575A2cbEE9977DC6";
// const provider = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';

// transferPolygon(provider, signerPrivateKey, receiverAddress, amount);



// // Testing PolygonBalance

// const provider = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';
// const Address = "0x6b129015863f065eDfF62359575A2cbEE9977DC6";
// PolygonBalance(provider, Address)



// // Testing GasFeePolygonTransfer

// const amount = "0.01";     // amount should not be in Wei !!!!
// const signerPrivateKey = '4d5dce7cd894bb37b6718d29c0fc06e57d47b45daa54a6c03f7fb5d672d0f0fc';
// const receiverAddress = "0x6b129015863f065eDfF62359575A2cbEE9977DC6";
// const provider = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';

// GasFeePolygonTransfer(provider, signerPrivateKey, receiverAddress, amount)