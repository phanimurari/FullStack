// const fruits = ['🍎', '🍌', '🍍'];  

// const numbers = [1, 2, 3, 4]

// fruits.forEach((fruit, index) => {   
//   console.log(`${index + 1}: ${fruit}`); 
// });


// const prices = [10, 20, 30]; 

// const withTax = prices.filter( p => {
//    const priceWithTax = p * 1.2
//    if(priceWithTax > 20) {
//     return priceWithTax
//    }
// }); 

// console.log(withTax); 


// 4️⃣ reduce – Combine Into One

// array.reduce((accumulator, currentValue) => {
//     // logic
//     return updatedAccumulator;
// }, initialValue);
  


// const nums = [1, 2, 3, 4]; 
// const total = nums.reduce((sum, num) => sum + num, 0);

// console.log(total)


// const arrays = [[1, 2], [3, 4], [5]];

// const flat = arrays.reduce((acc, curr) => acc.concat(curr), []);

// console.log(flat); // [1, 2, 3, 4, 5]

// const users = [{id: 1}, {id: 2}, {id: 3}]; 
// const user = users.find(u => u.id === 2);

// console.log(user)


// console.log(greeting); 
// let greeting = "Hello, world!";

// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// var b = 10;

// const ages = [16, 22, 35]; 
// const hasAdult = ages.every(age => age >= 18);  

// console.log(hasAdult)

// true const allAdults = ages.every(age => age >= 18); // false


// console.log(greeting); // Output: undefined
// var greeting = "Hello, world!";


// console.log(name); // ❌ ReferenceError
// let name = "Alice";


// Hoisting

// Simple Example:

// console.log(greeting); // Output: undefined
// var greeting = "Hello, world!";



// Why?
// Behind the scenes, JavaScript rewrites it like this:

// var greeting;           // Declaration is hoisted
// console.log(greeting);  // undefined (it exists but not assigned yet)
// greeting = "Hello, world!";

// sayHi(); // ✅ Works fine

// function sayHi() {
//   console.log("Hi!");
// }


// function sayHi() {
//   console.log("Hi!");
// }

// sayHi(); // ✅ Works fine


// sayBye(); 

// var sayBye = () => {
//     console.log("Bye!");
// };



const nums = [1, 2, 3, 4]; 
const total = nums.reduce((sum, num) => sum + num, 0);

// 4️⃣ reduce – Combine Into One

array.reduce((accumulator, currentValue) => {
    // logic
    return updatedAccumulator;
}, initialValue);
  