// function outerFunction() {
//   let counter = 0;

//   function innerFunction() {
//     counter++;
//     console.log(counter);
//   }

//   return innerFunction;
// }

// const myClosure = outerFunction(); // outerFunction runs, returns innerFunction

// myClosure(); // 1
// myClosure(); // 2
// myClosure(); // 3


// const hourEl = document.getElementById("hour");
// const minuteEl = document.getElementById("minutes");
// const secondEl = document.getElementById("seconds");
// const ampmEl = document.getElementById("ampm");

// function updateClock() {
//   let h = new Date().getHours();
//   let m = new Date().getMinutes();
//   let s = new Date().getSeconds();
//   let ampm = "AM";

//   if (h > 12) {
//     h = h - 12;
//     ampm = "PM";
//   }

//   h = h < 10 ? "0" + h : h;
//   m = m < 10 ? "0" + m : m;
//   s = s < 10 ? "0" + s : s;

//   hourEl.innerText = h;
//   minuteEl.innerText = m;
//   secondEl.innerText = s;
//   ampmEl.innerText = ampm;
//   setTimeout(() => {
//     updateClock();
//   }, 1000);
// }

// updateClock();

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

let person1 = new Person("Virat", "Kohli");
let person2 = new Person("Sachin", "Tendulkar");

console.log(Object.getPrototypeOf(person1) === Object.getPrototypeOf(person2));