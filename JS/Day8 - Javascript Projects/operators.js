// // // Spread Operator with Arrays

// // let arr1 = [2, 3];
// // let arr2 = [1, ...arr1, 4];

// // console.log(arr2);  // [1, 2, 3, 4]

// // // Creating a Copy

// // let arr1 = [2, 3];
// // let arr2 = [...arr1];

// // console.log(arr2);  // [2, 3]

// // Concatenation
// // let arr1 = [2, 3];
// // let arr2 = [4, 5];
// // let arr3 = [...arr1, ...arr2];

// // console.log(arr3);  // [2, 3, 4, 5]

// // // Spread Operator with Objects

// // let person = { name: "Rahul", age: 27 };
// // let personDetails = { ...person, city: "Hyderabad" };

// // console.log(personDetails);  // Object {name: "Rahul", age: 27, city: "Hyderabad"}


// // // Creating a Copy
// // let person = { name: "Rahul", age: 27 };
// // let personDetails = { ...person };

// // console.log(personDetails);  // Object {name: "Rahul", age: 27}

// // //  Object Concatenation

// // let person = { name: "Rahul", age: 27 };
// // let address = { city: "Hyderabad", pincode: 500001, age: 25 };
// // let personDetails = { ...person, ...address };

// // console.log(personDetails);  // Object {name: "Rahul", age: 27, city: "Hyderabad", pincode: 500001}


// // //  Spread Operator with Function Calls

// // The Spread Operator syntax can be used to pass an array of arguments to the function.
// // Extra values will be ignored if we pass more arguments than the function parameters.

function add(a, b, c, d, e) {
  return a + b + c;
}

let numbers = [1, 2, 3, 4, 5];
        
console.log(add(1, 2, 3, 4, 5));  // 6


// // The Default Parameters allow us to give default values to function parameters.

// function numbers(a = 2, b = 5) {
//   console.log(a);  // 3
//   console.log(b);  // 5
// }
// numbers(10);


// function numbers(...args) {
//   console.log(args);  // [1, 2, 3]
// }

// numbers(1, 2, 3);


function Fruit(color, taste, seeds) {
    this.color = color;
    this.taste = taste;
    this.seeds = seeds;
}

// Create an object
const fruit1 = new Fruit('Yellow', 'Sweet', 1);
console.log(fruit1)

// // Display the result
// console.log(fruit1)
// console.log(fruit1.color);


// Constructor Function

// function FunctionName(parameter1, parameter2, ...) {
//   this.property1 = parameter1;
//   this.property2 = parameter2;
//   ...
//   ...
// }
// let myObject = new FunctionName(arg1, arg2, ...)