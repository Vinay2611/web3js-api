// Dotenv javascript libraries needed
require('dotenv').config();
// Ethereum javascript libraries needed
var Web3 = require('web3');
var Tx = require("ethereumjs-tx").Transaction;
//var Tx = require('ethereumjs-tx');
// Rather than using a local copy of geth, interact with the ethereum blockchain via infura.io
// The key for infura.io is in .env
const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/de4110e195dc4787888f7c9e9aff53fc")
// Fixed-point notation for number of MFIL which is divisible to 3 decimal places
function financialMfil(numMfil) {
    return Number.parseFloat(numMfil / 1e3).toFixed(3);
}
// Create an async function so I can use the "await" keyword to wait for things to finish
const main = async () => {
    // This code was written and tested using web3 version 1.0.0-beta.29
    console.log(`web3 version: ${web3.version}`)
    // Who holds the token now?
    var myAddress = "0xb89d86b5886d374c1366c8b83ada3624864a761d";
    // Who are we trying to send this token to?
    var destAddress = "0x261928C5A2Ad4104a85B1625d12F91eb2349d6DA";
    // MineFIL Token (MFIL) is divisible to 3 decimal places, 1 = 0.001 of MFIL
    var transferAmount = 1;
    // Determine the nonce
    var count = await web3.eth.getTransactionCount(myAddress);
    console.log(`num transactions so far: ${count}`);
    // MineFILToken contract ABI Array
    var abiArray = [{"inputs":[{"internalType":"address","name":"__metacrypt_target","type":"address"},{"internalType":"string","name":"__cmt_name","type":"string"},{"internalType":"string","name":"__cmt_symbol","type":"string"},{"internalType":"uint256","name":"__cmt_initial","type":"uint256"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_GENERATOR","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"createdByMetacrypt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getIdentifier","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]
    // The address of the contract which created MFIL
    var contractAddress = "0x261928C5A2Ad4104a85B1625d12F91eb2349d6DA";
    var contract = new web3.eth.Contract(abiArray, contractAddress, {
        from: myAddress
    });
    // How many tokens do I have before sending?
    var balance = await contract.methods.balanceOf(myAddress).call();
    console.log(`Balance before send: ${financialMfil(balance)} MFIL\n------------------------`);
    // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
    // Use Gwei for the unit of gas price
    var gasPriceGwei = 3;
    var gasLimit = 3000000;
    // Chain ID of Ropsten Test Net is 3, replace it to 1 for Main Net
    var chainId = 3;
    var rawTransaction = {
        "from": myAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
        "gasLimit": web3.utils.toHex(gasLimit),
        "to": contractAddress,
        "value": "0x0",
        "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
        "chainId": chainId
    };
    console.log(`Raw of Transaction: \n${JSON.stringify(rawTransaction, null, '\t')}\n------------------------`);
    // The private key for myAddress in .env    
    let buf;
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
        buf = Buffer.from(process.env["PrivateKey"], 'hex');
        }  
        //buf = new Buffer(notNumber, encoding);
        
    var privKey = buf;
    console.log(privKey);
    //var privKey = new Buffer(process.env["PrivateKey"], 'hex');
    var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    // Comment out these four lines if you don't really want to send the TX right now
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    // The receipt info of transaction, Uncomment for debug
    console.log(`Receipt info: \n${JSON.stringify(receipt, null, '\t')}\n------------------------`);
    // The balance may not be updated yet, but let's check
    balance = await contract.methods.balanceOf(myAddress).call();
    console.log(`Balance after send: ${financialMfil(balance)} MFIL`);
}
main();

