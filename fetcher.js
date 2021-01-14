const request = require('request');
const fs = require('fs');

const requestContent = function(input) {
  if (input.length < 4) {
    console.log('Not enough arguments');
    return;
  }
  const inputArrays = input.slice(2);
  let URL = inputArrays[0];
  let localFile = inputArrays[1];

  request(URL, (error, response, body) => {
    if (error) {
      console.log(error, response, response.statusCode);
    }

    fs.writeFile(localFile, body, (error) => {
      if (error) { 
        console.log(error);
      } else {
        fs.stat(localFile, (err, stats) => {
          console.log(`Downloaded and saved ${stats.size} bytes to ${localFile}`);
        })
      }
    })
  })
};

requestContent(process.argv);