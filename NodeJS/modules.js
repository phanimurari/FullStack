const fs = require('fs');


// The fs module allows you to work with the file system on your computer, like reading or writing files.

// Reading a file
// fs.readFile('output.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// // // Writing to a file
// fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
//   if (err) throw err;
//   console.log('File written successfully.');
// });


// // The path module provides utilities for working with file and directory paths in a way that's safe across different operating systems.

const path = require('path');

const filePath = '/user/local/app/index.txt';

console.log(path.basename(filePath)); // index.js
console.log(path.dirname(filePath));  // /user/local/app
console.log(path.extname(filePath));  // .js

// url
// events
// os
// crypto
// util