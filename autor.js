/* 
Program to run automatically trade
Date: 27-10-21
Modified: 01-11-21
Created by: Vinay
*/

// variable declaration here
let abc = "abc";
let pair = abc+"/usdt";
let amount = "";
let price = 0.00100;
let total = "";
let ordertype = "";
let type = "";
var randomPrice = "";
//var calculatedValue =  Math.round(price * (12 / 100)); 
//var min = price - calculatedValue, max = price + calculatedValue;
var min = 0.00097, max = 0.00109;
var randomPrice = 100000 * Math.random() * (max - min) + min / 100000;
console.log(randomPrice);
var pointer = max;
var counter = 0.00001;

function generateRandomAmount() {
    var min = 0.0200, max = 0.120;
    var highlightedNumber = Math.random() * (max - min) + min;
    return highlightedNumber.toFixed(6);    
};

function generateRandomPrice(price,randomPrice) {              
    if(randomPrice <= price){    
        randomPrice += 1;
    }else{ 
        randomPrice -= 1;
    }                                     
    return randomPrice.toFixed(6);
}

function generateRandomType(){
    var types = ['sell', 'buy'];
    var type = types[Math.floor(Math.random()*types.length)];    
    return type;
}

function autoRun(){
    var amount = generateRandomAmount();
    var type = generateRandomType();    
    if(randomPrice >= min){         
        if(randomPrice > pointer){
            randomPrice -= counter;  
            //var diff = Math.abs( randomPrice - pointer );  
            var approxeq = (randomPrice, pointer, epsilon = 0.00001) => Math.abs(randomPrice - pointer) <= epsilon;
            console.log(approxeq);
            console.log(pointer);
            if(approxeq){
                console.log("max");
                pointer = max;                  
            }else{
                pointer = min;  
            }                     
        }
        else             
            randomPrice += counter;
    } 
    
    var finalPrice = randomPrice.toFixed(6);
    var total = amount * finalPrice;
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

setInterval( autoRun, 1000 ); // 1 second
 