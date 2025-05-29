// // ✅ 1. Batch DOM Reads & Writes
// // Problem: Interleaving DOM reads/writes causes layout thrashing
// // Each read/write can force the browser to recalculate layout.


// // Bad Way
// const el = document.getElementById('box');

// for (let i = 0; i < 100; i++) {
//   el.style.width = el.offsetWidth + 1 + 'px'; // read → write → read → write
// }

// // Good Way

// const el = document.getElementById('box');
// const width = el.offsetWidth; // Read once

// for (let i = 0; i < 100; i++) {
//   el.style.width = (width + i) + 'px'; // Batch writes
// }



// // ✅ 2. Use classList Instead of Inline Styles
// // Inline styles cause recalculation. Instead, toggle a class.

// // Bad

// element.style.backgroundColor = 'blue';
// element.style.border = '1px solid red';


// // Good

// // CSS
// .highlighted {
//   background-color: blue;
//   border: 1px solid red;
// }

// // JS

// element.classList.add('highlighted');


// // ✅ 3. Use will-change for GPU Hinting
// // Tell the browser in advance which property will change.

// // css

// // .card:hover {
// //   will-change: transform, opacity;
// // }


// // ⛔ Don’t overuse it – overhinting uses GPU memory unnecessarily.