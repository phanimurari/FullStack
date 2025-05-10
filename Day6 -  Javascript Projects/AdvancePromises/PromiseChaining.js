

//  const url = "https://apis.ccbp.in/jokes/random";
//  let responsePromise = fetch(url);
//  // Combining multiple .then()s or .catch()s to a single promise is called promise chaining.

// responsePromise
//   .then((response) => {
//     return response
//   })
//   .catch((error) => {
//     console.log(error);
//   })

//  const url = "https://apis.ccbp.in/jokes/random";
//  let responsePromise = fetch(url);
// //  OnSuccess Callback returns Promise

// responsePromise
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
// });

// //  Fetch with Error Handling
 const url = "";
 let responsePromise = fetch(url);

responsePromise
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data); // Object { value: "They call it the PS4 because there are only 4 games worth playing!"
  })
  .catch((error) => {
    console.log(error, "erro");
  });






// //  const url = "https://apis.ccbp.in/jokes/random";
// //  let responsePromise = fetch(url);
// //  Combining multiple .then()s or .catch()s to a single promise is called promise chaining.

// responsePromise
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   })

// //  const url = "https://apis.ccbp.in/jokes/random";
// //  let responsePromise = fetch(url);
// //  OnSuccess Callback returns Promise

// responsePromise
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
// });

// //  Fetch with Error Handling
// //  const url = "https://apis.ccbp.in/jokes/random";
// //  let responsePromise = fetch(url);

// responsePromise
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data); // Object { value: "They call it the PS4 because there are only 4 games worth playing!"
//   })
//   .catch((error) => {
//     console.log(error);
//   });