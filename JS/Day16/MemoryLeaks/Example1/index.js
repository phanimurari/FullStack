const button = document.getElementById('leakyBtn');

function leakyHandler() {
  console.log('Button clicked');
}

// 🧠 The leak:
const leakedArray = [];
let trackCount = 0


// button.addEventListener('click', () => {
//   // Every time the button is clicked, we store a HUGE unused object
//   leakedArray.push(new Array(1000000).fill('*'));
// });


button.addEventListener('click', () => {
  if (leakedArray.length > 2) leakedArray.shift(); // remove old stuff
  leakedArray.push(new Array(1000000).fill('*'));
});



// 🔍 What's Going Wrong?
// Every click adds a big array (1 million items) to leakedArray

// But you never remove or limit what's inside leakedArray

// This means memory usage keeps going up and up on every click

// Eventually, the browser gets heavy or crashes 💥

// ✅ How to Fix It?
// You have options:

// ✔️ Option 1: Limit the size of the array

// button.addEventListener('click', () => {
//   if (leakedArray.length > 10) leakedArray.shift(); // remove old stuff
//   leakedArray.push(new Array(1000000).fill('*'));
// });


// ✔️ Option 2: Remove event listeners when not needed
// function tempHandler() {
//   console.log('Clicked once');
//   button.removeEventListener('click', tempHandler); // cleanup!
// }

// button.addEventListener('click', tempHandler);

// ✔️ Option 3: Nullify references you don’t need
// let tempData = new Array(1000000).fill('*');
// // Use it...
// tempData = null; // ✅ tell JS it can garbage collect it
