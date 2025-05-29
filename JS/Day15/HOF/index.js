// // Higher Order Functions

// // function greetUser(name) {
// //   return `Hello, ${name}!`;
// // }

// // function processName(fn, value) {
// //   return fn(value);
// // }

// // const result = processName(greetUser, "Alice");
// // console.log(result); // Hello, Alice!

// // Map, filter, etc
// // [].map(() => {})


// // Function Composition

// // Function composition is the process of combining multiple functions to create a new function.
// //  The composed function applies multiple operations in sequence.

// // compose combines add and multiply, so the output of multiply is passed as input to add.
// // The result of compose(add, mul)(4) is 14 because 4 is first multiplied by 3 and then 2 is added.


// function add(x) {
//     return x + 2; // 12+2 =>14
// }
// function mul(x) {
//     return x * 3; //12
// }

// function compose(f, g) {
//     return function(x) {
//         return f(g(x)); //12
//   };
// }

// var res = compose(add, mul)(4);
// console.log(res);


// // // currying

// // // Currying transforms a function that takes multiple arguments into a series of functions that each take one argument.
// // //  This allows partial application of the function.

// // // The multiply function is curried, returning a new function each time it is called with an argument.
// // // multiplyBy2 is a partially applied function that multiplies any given number by 2.

// // // f(a, b, c) -> f(a)(b)(c)

// // // Regular Function
// // // function sum(a, b) {
// // //   return a + b;
// // // }

// // // sum(2, 3); // 👉 5

// // // Currying function
// // // function curriedSum(a) {
// // //   return function(b) {
// // //     return a + b;
// // //   };
// // // }

// // // curriedSum(2)(3); // 👉 5


// // function mul(x) {
// //     return function(y) {
// //         return x * y;
// //   };
// // }
// // var mul = mul(2);
// // console.log(mul(5));


// // // You can fix a few arguments of a function and get a new specialized function.

// // function multiply(a) {
// //   return function(b) {
// //     return a * b;
// //   };
// // }

// // const double = multiply(2);   // 💡 a is fixed to 2
// // console.log(double(5));       // 👉 10
// // console.log(double(10));      // 👉 20



// // // Memorization

// // // Memoization is a technique where function results are MyCached so that repeated calls with the same arguments return faster.
// // //  This is particularly useful for expensive function calls.
// // // memoize MyCaches the results of slowFunction calls. 
// // // The second time fast(5) is called, the result is fetched from the MyCache, avoiding recomputation.
// // // This optimization improves performance by saving on redundant calculations.


// // function slowSquare(n) {
// //   console.log('Calculating...');
// //   return n * n;
// // }

// // console.log(slowSquare(5)); // Logs: Calculating... 25
// // console.log(slowSquare(5)); // Logs: Calculating... 25 (again)



function memoize(func) {
    var MyCache = {};
    return function (arg) {
        if (MyCache[arg]) { 
            return MyCache[arg];
        } else {
            var res = func(arg);
            MyCache[arg] = res;
            return res;
        }
    };
}

function slow(num) {
    console.log("Computing...");
    return num * 2;
}

var fast = memoize(slow);
console.log(fast(5)); // Computing... 10
console.log(fast(5)); // 10 (MyCached)