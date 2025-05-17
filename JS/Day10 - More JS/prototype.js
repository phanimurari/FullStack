// Creating an Array with the new Operator (Older way of writing)
// Syntax: let myArray = new Array(item1, item2, ...);

// let myArray = new Array("a", 2, true);
// myArray.push("pen");

// console.log(myArray);  // Array (4)["a", 2, true, "pen"]
// console.log(myArray.length);  // 4

// ✅ Creating a Function Using the new Function() Constructor
// Syntax:

// let myFunction = new Function(name, [arg1, arg2, ...], functionBody);
// Each argument is passed as a string.

// The final argument is the function body, also as a string.

// let greet = new Function('name', 'return "Hello, " + name + "!";');

// console.log(greet("Alice"));  // Hello, Alice!



function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Person.prototype.displayFullName = function() {
//   return this.firstName + " " + this.lastName;
// };

let person1 = new Person("Virat", "Kohli");
let person2 = new Person("Sachin", "Tendulkar");

console.log(Object.getPrototypeOf(person1));
