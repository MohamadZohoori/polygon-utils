
const matic = require('@maticnetwork/maticjs')
const HDWalletProvider = require("@truffle/hdwallet-provider");
const w3 = require('@maticnetwork/maticjs-web3')
// import { POSClient,use } from "@maticnetwork/maticjs"

matic.use(w3.Web3ClientPlugin);

async function transferTokens(signerAddress,signerPrivateKey, receiverAddress, provider, tokenAddress, Amount) {

    const posClient = new matic.POSClient();
    await posClient.init({
      network: 'testnet',
      version: 'mumbai',
      parent: {
        provider: new HDWalletProvider (signerPrivateKey, provider),
        defaultConfig: {
          from : signerAddress
        }
      },
      child: {
        provider: new HDWalletProvider (signerPrivateKey, provider),
        defaultConfig: {
          from : signerAddress
        }
      }
  })
    // const client = await matic.getPOSClient();
    const erc20ChildToken = posClient.erc20(tokenAddress);
    const erc20ParentToken = posClient.erc20(tokenAddress,true);
    const balance = await erc20ChildToken.getBalance(signerAddress)
    console.log(balance);

    const result = await erc20ParentToken.transfer(Amount,receiverAddress);
    const txHash = await result.getTransactionHash();
    const txReceipt = await result.getReceipt();
    console.log(txReceipt, txHash)
    return txReceipt
}


async function TokensBalances(signerAddress, signerPrivateKey, provider, tokenAddress) {

  const posClient = new matic.POSClient();
  await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider (signerPrivateKey, provider),
      defaultConfig: {
        from : signerAddress
      }
    },
    child: {
      provider: new HDWalletProvider (signerPrivateKey, provider),
      defaultConfig: {
        from : signerAddress
      }
    }
})
  // const client = await matic.getPOSClient();
  const erc20ChildToken = posClient.erc20(tokenAddress);
  const balance = await erc20ChildToken.getBalance(signerAddress)
  console.log(balance);
  return balance
}






// Testing Token Transfer 

// const signerPrivateKey = '4d5dce7cd894bb37b6718d29c0fc06e57d47b45daa54a6c03f7fb5d672d0f0fc';
// const signerAddress = '0x429D5f671c77ccc6Dbea325882Baad7cA5a19df1'
// const receiverAddress = '0x6b129015863f065eDfF62359575A2cbEE9977DC6'
// // const provider = 'https://dimensional-proportionate-hexagon.matic-testnet.discover.quiknode.pro/1d453232bb5067a659cdff4726a73e022485ad62/'
// const provider =  'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78'
// const Amount = 1000000
// const tokenAddress = '0x0fa8781a83e46826621b3bc094ea2a0212e71b23'

// transferTokens(signerAddress, signerPrivateKey, receiverAddress, provider, tokenAddress, Amount )


// // Testing TokensBalances 

// const signerPrivateKey = '4d5dce7cd894bb37b6718d29c0fc06e57d47b45daa54a6c03f7fb5d672d0f0fc';
// const signerAddress = '0x429D5f671c77ccc6Dbea325882Baad7cA5a19df1'
// const provider =  'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78'
// const tokenAddress = '0x0fa8781a83e46826621b3bc094ea2a0212e71b23'

// TokensBalances(signerAddress, signerPrivateKey, provider, tokenAddress)



