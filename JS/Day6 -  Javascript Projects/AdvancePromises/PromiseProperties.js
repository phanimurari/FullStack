
// ✅ 1. Promise.resolve(value)
// Creates a promise that's already fulfilled.

// const p = Promise.resolve("🎉 Success");

// p.then(result => {
//   console.log("Resolved with:", result); // 🎉 Success
// });

// // ✅ 2. Promise.reject(error)
// // Creates a promise that's already rejected.


// const p = Promise.reject("❌ Something went wrong");

// p.catch(error => {
//   console.log("Rejected with:", error); // ❌ Something went wrong
// });


// // ✅ 3. .catch()
// // Handles a rejected promise.


// const p = new Promise((_, reject) => {
//   reject("🚫 API failed");
// });

// p.catch(error => {
//   console.log("Caught:", error); // 🚫 API failed
// });


// // ✅ 4. .finally()
// // Runs after fulfillment or rejection, no matter what.


const p = new Promise((resolve, reject) => {
  setTimeout(() => reject("✅ Done"), 1000);
});

p.catch(result => {
  console.log("Result:", result);
})
.finally(() => {
  console.log("🎬 Always runs at the end");
});



// // ✅ 5. .then(onFulfilled, onRejected)
// // Accepts two functions: one for success, one for failure.


// const isSuccess = false;

// const p = new Promise((resolve, reject) => {
//   isSuccess ? resolve("🎯 Success") : reject("💥 Failure");
// });

// p.then(
//   result => {
//     console.log("✔️ Success handler:", result);
//   },
//   error => {
//     console.log("❗ Error handler:", error);
//   }
// );
