// ---------------- CommonJS Exports ----------------

// 1. CommonJS Default Export
// const defaultGreeting = 'Hello from CommonJS Default Export!';
// const theGreeting = "hello named exports!"
// module.exports.defaultGreeting = defaultGreeting;
// module.exports.theGreeting = theGreeting;


// // 2. CommonJS Named Exports
// const name = 'Node.js';
// const version = '18.x';
// module.exports.name = name;
// module.exports.version = version;

// // Alternate way using exports object
// exports.sayHello = function () {
//   console.log('Hello from CommonJS Named Export!');
// };

// // ---------------- CommonJS Imports ----------------
// const greeting = require('./index.js'); // default export
// console.log(greeting); // "Hello from CommonJS Default Export!"

// const { name: importedName, version: importedVersion, sayHello } = require('./index.js');
// console.log(importedName);    // Node.js
// console.log(importedVersion); // 18.x
// sayHello();                   // Hello from CommonJS Named Export!


// // ---------------- Modern ESM Exports ----------------
// // NOTE: Only works if file is .mjs or "type": "module" in package.json

// // Default Export
// // export default 'Hello from ESM Default Export!';

// // Named Exports
// // export const framework = 'Express';
// // export function greetESM() {
// //   console.log('Hello from ESM Named Export!');
// // }

// // ---------------- Modern ESM Imports ----------------
// // import defaultMsg from './index.js';
// // import { framework, greetESM } from './index.js';

// // console.log(defaultMsg); // Hello from ESM Default Export!
// // console.log(framework);  // Express
// // greetESM();              // Hello from ESM Named Export!
