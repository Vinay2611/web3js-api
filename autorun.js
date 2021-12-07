/* 
Program to run automatically trade
Date: 27-10-21
Modified: 28-10-21
Created by: Vinay
*/

// variable declaration here
let abc = "abc";
let pair = abc+"/usdt";
let amount = "";
let price = "";
let total = "";
let ordertype = "";
let type = "";
var randomPrice = "";

function generateRandomAmount() {
    var min = 0.0200, max = 0.120;
    var highlightedNumber = Math.random() * (max - min) + min;
    return highlightedNumber.toFixed(4);    
};

function generateRandomPrice(price,randomPrice) {    
    var calculatedValue =  price * 6 / 100; 
    var min = price - calculatedValue, max = price + calculatedValue;
     if(!randomPrice){
        var randomPrice = Math.random() * (max - min) + min;
     }else{
        if(randomPrice <= price){    
            randomPrice += 1;
        }else{ 
            randomPrice -= 1;
        }        
     }                            
    return randomPrice;
}

function generateRandomType(){
    var types = ['sell', 'buy'];
    var type = types[Math.floor(Math.random()*types.length)];    
    return type;
}

function autoRun(){
    var amount = generateRandomAmount();
    var price = generateRandomPrice(100);
    var total = amount * price;
    var type = generateRandomType();
    var finalPrice = generateRandomPrice(100, price);
    var data = {
        pair : pair, 
        amount : amount, 
        price : finalPrice,  
        total : total,
        ordertype :  "limit" , 
        type : type        
    }
    console.log(data);
}
setInterval( autoRun, 1000); // 1 second
 