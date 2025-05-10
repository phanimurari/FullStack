// setTimeout Example - Runs once after a delay
// console.log("⏳ setTimeout started");

// // secheduler(callback function, delay in ms)


// setTimeout(() => {
//   console.log("✅ setTimeout executed after 2 seconds");
// }, 2000); // 2000 milliseconds = 2 seconds

// setInterval Example - Repeats at regular intervals
console.log("⏳ setInterval started");

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`🔁 setInterval executed ${count} time(s)`);

  if (count === 10) {
    clearInterval(intervalId); // Stop the interval after 5 runs
    console.log("🛑 setInterval stopped after 5 times");
  }
}, 1000); // Runs every 1 second
