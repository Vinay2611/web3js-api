const web3 = new Web3('HTTP://127.0.0.1:7545')

const account1 = '0x7F149Bb2B509FBD23dC94c039b8619d8ae1f4398'

const account2 = '0x91A7e87945E74fada21EdeFCBF8ff4ab232E1405'

web3.eth.getBalance(account1, (err, result)=> { console.log(result) })

web3.eth.sendTransaction({ from: account1, to: account2, value: web3.utils.toWei('1','ether') })
