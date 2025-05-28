// Example: 1

<div id="container">
  <button>Click 1</button>
  <button>Click 2</button>
</div>

document.getElementById('container').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    console.log('Button Clicked:', event.target.textContent);
  }
});

//output:
// Button Clicked: Click 1
// Explanation: Event is captured by #container and event.target identifies the button.


// Example: 2

<ul id="menu">
  <li>Home</li>
  <li>About</li>
</ul>


document.getElementById('menu').addEventListener('click', (e) => {
  alert(`Menu: ${e.target.innerText}`);
});


// Output:
// Clicking "About" triggers: Menu: About


// Example 3 – Dynamic Elements

document.body.innerHTML = `<ul id="list"></ul>`;

const list = document.getElementById('list');
for (let i = 1; i <= 3; i++) {
  let li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li);
}

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log(`You clicked ${e.target.textContent}`);
  }
});

// Output:
// You clicked Item 2
// Explanation: All future <li>s also work without new listeners.


// Example 4 – Check Input Type

{/* <form id="form">
  <input type="text" name="username">
  <input type="checkbox" name="agree">
</form> */}


document.getElementById('form').addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    console.log('Checkbox changed:', e.target.checked);
  } else {
    console.log('Text input changed:', e.target.value);
  }
});


{/* output:
Checkbox changed: true
Text input changed: Alice */}


// Example – Event Delegation with Event Capturing ❗️

document.body.addEventListener('click', (e) => {
  console.log('BUBBLE: ' + e.target.tagName);
}, false);

document.body.addEventListener('click', (e) => {
  console.log('CAPTURE: ' + e.target.tagName);
}, true);

// Output:
// CAPTURE: BUTTON
// BUBBLE: BUTTON


// Filtering Based on Class

<ul id="tasks">
  <li class="task">Task 1</li>
  <li>Note</li>
  <li class="task">Task 2</li>
</ul>


document.getElementById('tasks').addEventListener('click', (e) => {
  if (e.target.classList.contains('task')) {
    console.log(`Task selected: ${e.target.textContent}`);
  }
});

// output:
// Task selected: Task 1



