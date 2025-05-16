// ✅ Promise.all()
// ✅ Resolves when all promises succeed
// ❌ If any promise fails, the whole thing fails


// const p1 = Promise.reject(1);
// const p2 = Promise.resolve(2);
// const p3 = Promise.resolve(3);

// Promise.all([p1, p2, p3])
//   .then(results => {
//     console.log("✅ All resolved:", results); // [1, 2, 3]
//   })
//   .catch(error => {
//     console.error("❌ One failed:", error);
// });

// ✅ Promise.allSettled()
// ✅ Waits for all promises to settle
// Returns results for both fulfilled and rejected ones


// const p1 = Promise.resolve("Success");
// const p2 = Promise.reject("Error");
// const p3 = Promise.resolve("Done");

// Promise.allSettled([p1, p2, p3])
//   .then(results => {
//     console.log("All settled:");
//     console.log(results);
//     /*
//     [
//       { status: 'fulfilled', value: 'Success' },
//       { status: 'rejected', reason: 'Error' },
//       { status: 'fulfilled', value: 'Done' }
//     ]
//     */
// });


// ✅ Promise.any()
// ✅ Resolves as soon as any one promise fulfills
// ❌ Only rejects if all promises reject


// const p1 = Promise.reject("Fail 1");
// const p2 = Promise.reject("First success 🎉");
// const p3 = Promise.reject("Second success");

// Promise.any([p1, p2, p3])
//   .then(result => {
//     console.log("✅ First fulfilled:", result); // "First success 🎉"
//   })
//   .catch(error => {
//     console.error("❌ All failed:", error);
//   });


// ✅ Promise.race()
// ✅ Resolves or rejects as soon as the first promise settles (win or fail)


const fast = new Promise((resolve, reject) => setTimeout(() => reject("Fast!"), 100)); 
const slow = new Promise((resolve, reject) => setTimeout(() => reject("Slow..."), 1000)); 

Promise.race([fast, slow])
  .then(result => {
    console.log("🏁 First settled:", result); // "Fast!"
  })
  .catch(error => {
    console.error("❌ First error:", error);
});
