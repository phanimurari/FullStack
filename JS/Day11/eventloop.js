// // Example 1: Simple Synchronous Code

// console.log("Start");

// function first() {
//     console.log("First");
// }

// function second() {
//     console.log("Second");
// }

// first();
// second();

// console.log("End");

// // Example 2: setTimeout Basics

// // Explanation: Even with 0 delay, the setTimeout callback goes to the callback queue and executes after the main stack clears.

// console.log("Start");

// setTimeout(() => {
//     console.log("Timeout callback");
// }, 0);

// console.log("End");

// // Medium Level
// // Example 1: Mixed Sync and Async

// // Explanation: Microtasks (promises) run before macrotasks (setTimeout) when the stack is clear.


// console.log("Script start");

// setTimeout(() => {
//     console.log("setTimeout 1");
// }, 0);

// setTimeout(() => {
//     console.log("setTimeout 2");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Promise 1");
// });

// Promise.resolve().then(() => {
//     console.log("Promise 2");
// });

// console.log("Script end");

// // // Example 2: Nested Timeouts
// // Explanation: The nested timeout can only execute after its parent callback completes and the next event loop cycle begins.

// console.log("Start");

// setTimeout(() => {
//     console.log("Timeout 1");
    
//     setTimeout(() => {
//         console.log("Nested Timeout");
//     }, 0);
// }, 0);

// setTimeout(() => {
//     console.log("Timeout 2");
// }, 0);

// console.log("End");


// // Hard Level
// // Example 1: Complex Micro/Macro Task Mix

// // Explanation: Shows how promise chains create microtasks and how new macrotasks scheduled from microtasks get queued.

// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve()
//     .then(() => {
//         console.log("Promise 1");
//         return Promise.resolve("Inner Promise");
//     })
//     .then(msg => {
//         console.log("Promise 2", msg);
//         setTimeout(() => {
//             console.log("Timeout from Promise");
//         }, 0);
//     });

// console.log("End");

// // Example 2: Event Loop with Async/Await

// // Explanation: Demonstrates how async/await works with promises and the event loop, with await essentially creating a microtask.

// console.log("Script start");

// async function asyncFunc() {
//     console.log("Async function start");
//     await Promise.resolve();
//     console.log("Async function after await");
// }

// setTimeout(() => console.log("setTimeout"), 0);

// asyncFunc();

// new Promise(resolve => {
//     console.log("Promise executor");
//     resolve();
// }).then(() => {
//     console.log("Promise then");
// });

// console.log("Script end");


// // Example 3: I/O and Immediate Callbacks
// Explanation: Shows the full priority order in Node.js: nextTick > promises > timers > setImmediate.

console.log("Start");

setImmediate(() => {
    console.log("setImmediate");
});

setTimeout(() => {
    console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

process.nextTick(() => {
    console.log("nextTick");
});

console.log("End");