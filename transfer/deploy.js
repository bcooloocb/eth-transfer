const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'YOUR SECRET PASS PHRASE HERE',
  'https://rinkeby.infura.io/v3/7a1f0a490671477d9ae77e50813c4968'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log(interface);
  console.log('Contract deployed to', result.options.address);
};
deploy();
