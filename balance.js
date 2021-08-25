const Web3 = require('web3')
const express = require('express')
const route = express.Router()

//variable
const privateKey = '52be92ef26afd22539107b76f7324443dcb9ec526abcf90ff92a9e0c46c1a155'
const addressFrom = '0x36ec5A79fd158d38328E45ce8a392400bad9b925'
const addressTo = '0xaf29a6037Ede8b5E9cDB3C63B269a942EEe1B021'
const web3 = new Web3('HTTP://127.0.0.1:7545')

//Balance
route.get('/balance', async(req, res) => {
    try{

        const balance = async() => {
        const balanceFrom = web3.utils.fromWei(
            await web3.eth.getBalance(addressFrom), 'ether'
        )

        const balanceTo = web3.utils.fromWei(
            await web3.eth.getBalance(addressTo), 'ether'
        )
        
        console.log(`balance : ${addressFrom} is: ${balanceFrom}`)
        console.log(`balance : ${addressTo} is: ${balanceTo}`)

        //res.send(balance)
        //res.json(`balance : ${addressFrom} is: ${balanceFrom}`)
        res.send(balanceTo)
        }
        balance()
        
    }catch(err){
        res.send("Error: " + err)
    }
    //balance()
}) 



route.get('/transaction', async(req, res) => {
    try{
        //transaction
        const deploy = async () => {
            console.log(`test from: ${addressFrom} to: ${addressTo}`)

            const createTransaction = await web3.eth.accounts.signTransaction(
                {
                    from: addressFrom,
                    to: addressTo,
                    value: web3.utils.toWei('2', 'ether'),
                    gas: '6721975',
                },
                privateKey
            )

            //Deploy
            const createReceipt = await web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            )
            
            console.log(`Transaction receipt : ${createReceipt.transactionHash} `)
            res.send(`Transaction receipt : ${createReceipt.transactionHash} `)
            
        }
        deploy()
    }catch(err){
        res.send("Error: " + err)
    }
    //balance()
}) 


module.exports = route