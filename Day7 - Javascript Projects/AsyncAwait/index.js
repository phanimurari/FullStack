// Syntax :

// const myPromise = async () => {
//   let promiseObj1 = fetch(url1);
//   let response1 = await promiseObj1;
//   let promiseObj2 = fetch(url2);
//   let response2 = await promiseObj2;
// };

// myPromise()

// Fetch with Async and Await

// const url = "https://apis.ccbp.in/jokes/random";

// const doNetworkCall = async () => {
//   const response = await fetch(url) ;
//   const jsonData = await response.json();
//   console.log(jsonData);
// };

// doNetworkCall();

// Error Handling with Async and Await

// const url = "https://apis.ccbp.in/jokes/rando";

// // Internal API Errors, Timeout , Network Errors

// const doNetworkCall = async () => {
//   try {
//     const response = await fetch(url);
//     const jsonData = await response.json();
//     console.log(jsonData);
//   } catch (error) {
//     console.log(error);
//   }
// };

// doNetworkCall();


// Async Function always returns Promise

const url = "https://apis.ccbp.in/jokes/random";

const doNetworkCall = async () => {
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
};

const asyncPromise = doNetworkCall();
console.log(asyncPromise);