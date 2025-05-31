// const map = new Map();

// const objKey = { id: 1 };
// const funcKey = function () {};

// map.set('a', 100);         // String key
// map.set(1, 'number');      // Number key
// map.set(objKey, 'object'); // Object key
// map.set(funcKey, 'func');  // Function key

// console.log(map.get('a'));        // 100
// console.log(map.get(objKey));     // "object"
// console.log(map.has(1));          // true
// console.log(map.size);            // 4


// ✅ Example 1: Counting Word Frequencies

// const text = "hello world hello map map map world";
// const words = text.split(" ");

// const wordCount = new Map();

// for (const word of words) {
//   const count = wordCount.get(word) || 0;
//   wordCount.set(word, count + 1);
// }

// console.log(wordCount);
// // Map(3) { 'hello' => 2, 'world' => 2, 'map' => 3 }

// 💡 Use case: Quickly count occurrences of each item — Map shines here because it's clean and efficient.


// ✅ Example 2: Caching Expensive Function Results

// const cache = new Map();

// function expensiveCalculation(x) {
//   if (cache.has(x)) {
//     console.log("From cache 🔁");
//     return cache.get(x);
//   }

//   const result = x * x; // simulate heavy work
//   cache.set(x, result);
//   return result;
// }

// console.log(expensiveCalculation(4)); // 16
// console.log(expensiveCalculation(4)); // From cache 🔁 16
// 💡 Helps avoid repeated expensive computation.


//Weak Map

const weakMap = new WeakMap();

let user = { name: "Alice" };
weakMap.set(user, "metadata");

// Accessing value
console.log(weakMap.get(user)); // "metadata"

// After removing the only reference to `user`
user = null;

console.log(weakMap.get(user)); // "metadata"

// // At this point, the key-value pair might be garbage collected
