const Web3 = require('web3')

//variable
const privateKey = '3ef83c75d3bfa01e43a7fd43c94acd42224ddc0bb696c4cb914f318ffcc8e02e'
const addressFrom = '0x6F80e996346169BcEFFD044220faeF6745ed8E1D'
const addressTo = '0x2c0D92171CcBf3Fab2c01c57f47F1DFC985A2806'
const web3 = new Web3('HTTP://127.0.0.1:7545')

//Balance
const balance = async() => {

    const balanceFrom = web3.utils.fromWei(
        await web3.eth.getBalance(addressFrom), 'ether'
    )

    const balanceTo = web3.utils.fromWei(
        await web3.eth.getBalance(addressTo), 'ether'
    )
    
    console.log(`balance : ${addressFrom} is: ${balanceFrom}`)
    console.log(`balance : ${addressTo} is: ${balanceTo}`)
} 
 
balance()