

// // 1. Template Strings

function greetUser(name) {
    console.log(`Hello, ${name}`);
}

// // greetUser("Sam")

// //2. this 



// // Literal syntax (most common)
// // const car = {
// //     brand: "Toyota",
// //     year: 2020
// // };
  
// //   const car2 = new Object();
// //   car2.brand = "Ford";
  
// // //   Two different ways to access the object
  
// //   console.log(car.brand); // Dot notation

// //   const theYear = "year"
// //   console.log(car[theYear]); // Bracket notation
  
// //   car.year = 2022; // Modify
// //   car.model = "Corolla"; // Add


// // Example 1:

const user = {};
Object.defineProperty(user, "password", {
  value: "secret123",
  writable: true,     // can't be changed
  enumerable: true,   // won't show in loops
  configurable: true  // can't be deleted or reconfigured
});

console.log(user.password); // secret123
user.password = "hack";     // ❌ won't change
console.log(Object.keys(user)); // []

delete user.password


// // Example 2:

// const user = {};

// // 1. Password (as in your original example - hidden and unchangeable)
// Object.defineProperty(user, "password", {
//   value: "secret123",
//   writable: false,
//   enumerable: false,
//   configurable: false
// });

// // 2. Username - visible but can't be changed
// Object.defineProperty(user, "username", {
//   value: "john_doe",
//   writable: false,
//   enumerable: true,  // shows up in Object.keys()
//   configurable: true
// });

// // 3. Email - changeable and visible
// Object.defineProperty(user, "email", {
//   value: "john@example.com",
//   writable: true,
//   enumerable: true,
//   configurable: true
// });

// // 4. Age - hidden but changeable
// Object.defineProperty(user, "age", {
//   value: 30,
//   writable: true,
//   enumerable: false,  // won't show in Object.keys()
//   configurable: true
// });

// // 5. SecretToken - completely locked down (like password)
// Object.defineProperty(user, "secretToken", {
//   value: "abc123xyz",
//   writable: false,
//   enumerable: false,
//   configurable: false
// });

// console.log(user.password);      // "secret123" (exists but hidden)
// console.log(user.username);      // "john_doe"
// console.log(user.email);         // "john@example.com"
// console.log(user.age);           // 30 (exists but hidden)
// console.log(user.secretToken);   // "abc123xyz" (exists but hidden)

// // Try to change values
// user.username = "new_name";      // Fails silently (can't change)
// user.email = "new@email.com";     // Succeeds
// user.age = 31;                   // Succeeds (but still hidden)

// // See which properties are visible
// console.log(Object.keys(user));  // ["username", "email"] only

// // Try to delete properties
// delete user.password;            // Fails (can't delete)
// delete user.email;               // Succeeds (if configurable)

// console.log(user)

// const user = {
//     name: "Phani",
//     age: "25"
// }

// console.log(Object.keys(user))
// console.log(Object.values(user))
// console.log(Object.entries(user))

// const arr = [ [ 'name', 'Phani' ], [ 'age', '25' ] ];

// console.log(Object.fromEntries(arr))


// const original = {
//     name: "Sam",
//     settings: { dark: true }
//   };
  
// // Shallow copy
// const copy = Object.assign({}, original);
// console.log(copy)
  

// const settings = Object.freeze({
//     darkMode: true
// });
// settings.darkMode = false; // ❌ won't work

// console.log(settings)


// const config = {
//     version: 1
//   };

// Object.seal(config);
// config.version = 2;    // ✅ allowed
// config.newProp = true; // ❌ not allowed

// console.log(config)

// const  user1= {

// }

// const user2 = {

// }


// function createUser(name, role) {
//     return {
//       name,
//       role,
//       isAdmin: function admin() {
//         return role === "admin";
//       }
//     };
// }
// const user1 = createUser("Ravi", "user");
// const admin = createUser("Meera", "admin");
// console.log(admin.isAdmin()); // true
// console.log(user1.isAdmin())
// console.log(admin.name)
// console.log(user1.name)


const original = {
    name: "Sam",
    settings: { dark: true }
  };

  console.log(typeof JSON.stringify(original))


 // Deep copy (safer way)
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.name = "Jack"
console.log(deepCopy)
console.log(original)

  
//   // Shallow copy
//   const copy = Object.assign({}, original);
//   copy.settings.dark = false;
  
//   console.log(original.settings.dark); // ❗ false — changed original too!
//   console.log(original)




function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
  
    if (Array.isArray(obj)) {
      return obj.map(deepClone);
    }
  
    const result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
    return result;
}
  