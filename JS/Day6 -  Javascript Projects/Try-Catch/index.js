// // ✅ 1. try + catch
// // Handles errors gracefully.

// // Syntax
// // try {
// //  // code
// // }
// // catch (error) {
// //  // Error catched
// // }


// // try {
// //     // let result = 10 / 0;
// //     // console.log("Result:", result); // Still prints "Infinity"

// //     const result = fech(u)

// //   } catch (error) {
// //     console.log("Caught an error:", error.message);
// // }

// // ✅ 2. try + catch + finally
// // finally block runs no matter what (success or failure).

// // try {
// //     let numbers = [1, 2, 3];
// //     console.log(numbers[5].toString()); // Error: Cannot read properties of undefined
// //   } catch (error) {
// //     console.log("Error caught:", error.message);
// //   } finally {
// //     console.log("This block always runs 🚀");
// // }
  
// //   ✅ 3. Using throw to Create a Custom Error

// // function divide(a, b) {
// //     if (b === 0) { 
// //       throw new Error("Cannot divide by zero ❌");
// //     }
// //     return a / b;
// // }
  
// // try {
// //     let result = divide(8, 0);
// //     console.log("Result:", result);
// //     } catch (error) {
// //     console.log("Caught error:", error.message);
// // }

// // ✅ 4. try + finally (without catch)
// // You can technically omit catch.

// try {
//     console.log("Running some code...");
//     // Simulate code that doesn't fail
//   } finally {
//     console.log("Always runs cleanup or exit code!");
// }
  
// object destructing

const object = {
    "value": "So this person went to the doctor and told the doctor he had an addiction to twitter and the doctor said well I am not following.",
    "a" : 'apple'  
}

  const {value, a} = object
  console.log(value)
  console.log(a)