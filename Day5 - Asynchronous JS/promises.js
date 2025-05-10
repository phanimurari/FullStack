// Resolved Promise Example

// new Promise((resolve, reject) => {
//    // resolve the promise / reject the promise
// })

// const resolvedPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("✅ Promise resolved successfully!");
//     }, 1000);
//   });
  
//   resolvedPromise.then(result => {
//     console.log(result, "promise is resolved");
//   }).catch(error => {
//     console.error(error);
//   });
  
  // Rejected Promise Example
  const rejectedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("❌ Promise was rejected!");
    }, 1000);
  });
  
  rejectedPromise.then(result => {
    console.log(result);
  }).catch(error => {
    console.error(error, "the promise is rejected");
  });


  // promise chaining
  // promises.all(promise, promise, promise)