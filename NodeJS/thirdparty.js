// It is a third-party package for manipulating JavaScript dates in a browser & Node.js.



const {addDays} = require('date-fns');
const result = addDays(new Date(2021, 0, 11), 10);

console.log(result);

// While creating the Date() object, we have to provide the month index from (0-11), whereas we will get the output considering Jan=1 and Dec=12.