var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
const axios = require('axios');

async function total_supply(){	 	 
	axios.get('https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=WBHJFYSTDMRN7TDWPBYSG98ACUWX8YVBW7')
    .then(response => {
        console.log(response.data);
		try {
            console.log("Success");
		} catch (error) {
			console.log("Error:"+e);
		}
    })
    .catch(error => {
        console.log(error);
    });
}

async function eth_last_price(){	 	 
	axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=WBHJFYSTDMRN7TDWPBYSG98ACUWX8YVBW7')
    .then(response => {
        console.log(response.data);
		try {
            console.log("Success");
		} catch (error) {
			console.log("Error:"+e);
		}
    })
    .catch(error => {
        console.log(error);
    });
}

async function market_cap(){	 	 
	axios.get('https://api.coinmarketcap.com/v1/ticker')
    .then(response => {
        console.log(response.data);
		try {
            console.log("Success");
		} catch (error) {
			console.log("Error:"+e);
		}
    })
    .catch(error => {
        console.log(error);
    });
}

total_supply();
eth_last_price();
//market_cap();