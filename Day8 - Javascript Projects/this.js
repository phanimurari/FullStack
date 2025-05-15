// console.log("1. In an object method, `this` refers to the object:");
// const person = {
//   name: "Phani",
//   sayHello: function () {
//     function () {
         
//   },
// };
// person.sayHello(); // this refers to 'person'


// console.log("\n2. Alone, `this` refers to the global object:");
// console.log("  ->", this); // In Node.js (outside function), this is an empty object {}

// console.log("\n3. In a regular function, `this` refers to the global object (or undefined in strict mode):");
// function showThis() {
//   console.log("  -> Inside regular function:", this);
// }
// showThis(); // this refers to global object (in Node, it's global)

// console.log("\n4. In a function, in strict mode, `this` is undefined:");
// function strictFunction() {
//   'use strict';
//   console.log("  -> Inside strict function:", this);
// }
// strictFunction(); // this is undefined

// console.log("\n5. In an event, `this` refers to the element that received the event:");

// console.log(`  <button onclick="console.log(this)">Click Me</button>`);

// const person = {
//   name: "Phani",
//   sayHello: function () {
//     console.log(this.name)
//   }
// };
// person.sayHello(); // this refers to 'person'


// const person = {
//   name: "Bob",
//   greet: function() {
//     const arrow = () => {
//       console.log(this.name); // 'this' is inherited from greet
//     };
//     arrow();
//   }
// };
// person.greet(); // Output: "Bob"


// console.log("\n6. Using call(), apply(), and bind() to change `this`:");
// function greet() {
//   console.log("  -> Hello from", this.name);
// }

// const user = { name: "Shyam" };

// greet.call(user);  // call sets 'this' to user
// greet.apply(user); // apply also sets 'this' to user

// const boundGreet = greet.bind(user);
// boundGreet();      // bind returns a new function with 'this' set to user
