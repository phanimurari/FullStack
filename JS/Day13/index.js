// 1️⃣ Array.prototype.includes()
// ✅ Checks if an array contains a certain value.

// console.log(Array.prototype, "Array.prototype.includes")


// if (!Array.prototype.includes) {
//   Array.prototype.includes = function(searchElement, fromIndex) {
//     const len = this.length;
//     let i = fromIndex || 0;

//     if (i < 0) i = len + i;

//     for (; i < len; i++) {
//       if (this[i] === searchElement) {
//         return true;
//       }
//     }
//     return false;
//   };
// }

// console.log(Array.prototype)


// if (!Array.prototype.includesCheck) {
//   Array.prototype.includesCheck = function(searchElement, fromIndex) {
//     if (this == null) {
//       throw new TypeError('Array.prototype.includesCheck called on null or undefined');
//     }

//     const arr = Object(this);
//     const len = arr.length >>> 0;

//     if (len === 0) return false;

//     let start = fromIndex | 0; // Convert to integer

//     // Handle negative fromIndex
//     if (start < 0) {
//       start = Math.max(len + start, 0);
//     }

//     for (let i = start; i < len; i++) {
//       if (arr[i] === searchElement || (Number.isNaN(arr[i]) && Number.isNaN(searchElement))) {
//         return true;
//       }
//     }

//     return false;
//   };
// }


// const arr = ['apple', 'banana', 'cherry'];

// console.log(arr.includesCheck('banana')); // true
// console.log(arr.includesCheck('grape'));  // false
// console.log(arr.includesCheck('cherry', -1)); // true
// console.log([NaN].includesCheck(NaN)); // true ✅ (just like native includes)


// ✅ So now ['a', 'b'].includes('b') will work even in old browsers.


// 3️⃣ Promise
// ✅ A native feature since ES6, but older browsers don’t have it.

// if (!window.Promise) {
//   window.Promise = function(executor) {
//     // This is a mock and does not fully implement Promises!
//     let callbacks = [];

//     this.then = function(callback) {
//       callbacks.push(callback);
//       return this;
//     };

//     function resolve(value) {
//       callbacks.forEach(fn => fn(value));
//     }

//     executor(resolve);
//   };
// }
// // ⚠️ Note: This is a toy version. Real polyfills for Promise are more complex.

// // 4️⃣ fetch()
// // ✅ Used for network requests; not supported in old browsers.

// // Polyfills usually redirect to XMLHttpRequest internally:

// if (!window.fetch) {
//   window.fetch = function(url, options) {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open(options?.method || 'GET', url);
//       xhr.onload = () => resolve({ text: () => Promise.resolve(xhr.responseText) });
//       xhr.onerror = () => reject(new TypeError('Network request failed'));
//       xhr.send(options?.body || null);
//     });
//   };
// }

// // ✅ With this, you can write fetch('/data.json') safely.