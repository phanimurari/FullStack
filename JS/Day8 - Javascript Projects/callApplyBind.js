// // Call
// // function greet() {
// //   console.log("Hello " + this.name);
// // }

// // const user = { name: "Charlie" };

// // greet.call(user); // Output: Hello Charlie


// // //Apply
// // Example : 1
// function introduce(city, age) {
//   console.log(`${this.name} is from ${city} and is ${age} years old.`);
// }

// const user = { name: "Diana" };

// introduce.apply(user, ["Delhi", 30]);
// // Output: Diana is from Delhi and is 30 years old.

// //Example: 2

// const person = {
//   fullName: function() {
//     return this.firstName + " " + this.lastName;
//   }
// }

// const person1 = {
//   firstName: "Mary",
//   lastName: "Doe"
// }

// // This will return "Mary Doe":
// console.log(person.fullName.apply(person1));

// // Bind

const user = { name: "Eve" };

function sayHi() {
  return "Hi " + this.name;
}

const boundSayHi = sayHi.bind(user);
console.log(boundSayHi()); // Output: Hi Eve
