// function outerFunction() {
//   let counter = 0;

//   function innerFunction() {
//     counter++;
//     console.log(counter);
//   }

//   return innerFunction;
// }

// const myClosure = outerFunction(); // outerFunction runs, returns innerFunction

// myClosure(); // 1
// myClosure(); // 2
// myClosure(); // 3


// 🔍 What’s Happening Here?
// outerFunction() runs and defines a variable counter.

// It then returns the innerFunction.

// Even though outerFunction() is done running, myClosure (which is innerFunction) still remembers counter.

// That’s a closure — innerFunction keeps the reference to its outer scope.


// 📌 Closures Are Useful For:
// 1. Data Privacy / Encapsulation
// You can keep variables private using closures


// function createCounter() {
//   let count = 0;

//   return {
//     increment: () => ++count, // Arrow function
//     decrement: () => --count,
//     getCount: () => count,
//     count : count
//   };
// }

// const counter = createCounter();

// console.log(counter.increment()); // 1
// console.log(counter.increment()); // 2
// console.log(counter.getCount());  // 2
// console.log(counter.count);       // undefined ❌ (count is private)



// // 2. Function Factories
// // You can generate functions with pre-filled behavior.

// function makeGreeting(greeting) {
//   return function(name) {
//     console.log(`${greeting}, ${name}`);
//   };
// }

// // Template String -> includes values inside the strings

// const sayHello = makeGreeting("Hello");
// const sayHi = makeGreeting("Hi");

// sayHello("Phani"); // Hello, Phani
// sayHi("Ram");      // Hi, Ram



// // 3. setTimeout / Event Listeners
// // Closures are common in async code like timers.

function delayedGreeting(name) {
  let greeting = "Hello";

  setTimeout(function() {
    console.log(`${greeting}, ${name}`);
  }, 1000);
}

delayedGreeting("Phani"); // After 1s: Hello, Phani


// 🧠 Remember:
// Every time you create a function inside another function, and use outer variables, you're using a closure.

