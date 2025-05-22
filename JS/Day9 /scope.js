// let name = "John"; // Global variable

// function sayHello() {
//       console.log("Hello " + name);
// }

// sayHello(); // Output: "Hello John"



// function outerFunction() {
//   let outerVariable = "I'm outside!";

//   function innerFunction() {
//     console.log(outerVariable); // ✅ This works!
//   }


//   innerFunction();
// }

// outerFunction();


// function outerFunction() {
//   function innerFunction() {
//     console.log(outerVariable); // ❌ ReferenceError: Cannot access 'outerVariable' before initialization
//   }

//   innerFunction();
// }

// outerFunction();

// let outerVariable = "I'm outside!";


// 🔄 Nested Functions and Lexical Scope


// function first() {
//   let a = 1;

//   function second() {
//     let b = 2;

//     function third() {
//       let c = 3;
//       console.log(a, b, c); // ✅ Can access all: 1 2 3
//     }

//     third();
//   }

//   second();
// }

// first();


// 🔍 Explanation:
// third() is inside second(), which is inside first().

// It can see:

// c (declared inside third)

// b (declared inside second)

// a (declared inside first)

// This is how nested lexical scopes work!

// block Scope
// if(true) {
//   let a = 1
//   console.log(a)
// }

// console.log(a)