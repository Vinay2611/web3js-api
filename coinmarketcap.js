
/* Example in Node.js ES6 using request-promise */

const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  //uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  //uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/category',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest&symbol=BTC',
//   qs: {
//     'start': '1',
//     'limit': '5000',
//     'convert': 'USD'
//   },
  headers: {
    'X-CMC_PRO_API_KEY': '48d69f1c-9851-43bf-94aa-64426e6b477a'
  }
  // json: true,
  // gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
}).catch((err) => {
  console.log('API call error:', err.message);
});