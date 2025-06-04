// ✅ Custom EventEmitter – Basic Implementation

class CustomEventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // Emit an event
  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  // Remove a specific listener
  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      listener => listener !== listenerToRemove
    );
  }

  // Run a listener only once
  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }
}


const emitter = new CustomEventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

function shout(name) {
  console.log(`HEY ${name.toUpperCase()}!!!`);
}

// Subscribe to 'sayHello' event
emitter.on('sayHello', greet);
emitter.on('sayHello', shout);

// Emit 'sayHello' event
emitter.emit('sayHello', 'Alice');

// Output:
// Hello, Alice!
// HEY ALICE!!!

// Remove one listener
emitter.off('sayHello', greet);

// Emit again
emitter.emit('sayHello', 'Bob');

// Output:
// HEY BOB!!!

// Emit a once-only listener
emitter.once('sayBye', name => console.log(`Bye, ${name}!`));
emitter.emit('sayBye', 'Charlie');
emitter.emit('sayBye', 'Dave');

// Output:
// Bye, Charlie!
// (Nothing for Dave)





// 🎯 Summary
// With this basic CustomEventEmitter, you can:

// .on() → Subscribe to events

// .emit() → Emit events

// .off() → Unsubscribe

// .once() → Subscribe once only


// practical Scenarios

// State Management (Redux-like Store)
// Use case: When app state changes, notify listeners without React or external libraries.


// Custom store
function setState(newState) {
  state = { ...state, ...newState }; 
//   state = {x:1, y:2}
//   newState = {x:2, z:3} 
//   state = {x:2, y:2, z:3}
  emitter.emit('state:change', state);
}

// const renderUI = () => appendChild JSX elements to HTML documemnt

// Somewhere else
emitter.on('state:change', updatedState => {
  renderUI(updatedState);
});

// 🔁 Keeps UI reactive without full-fledged frameworks.




// Render Products & “Add to Cart”
// ->Given a static array of product objects (id, name, price, imageUrl), dynamically render cards on the page, each with an Add to Cart button.

// ->Clicking it should add that product (with default quantity 1) to an in-memory cart array.

// *


HTML 

<div id=""> 


</div>


<button>Add to cart</button>


obj1 = {
    id,
    name, 
    price, 
    imageUrl
}

obj2 = {
    id : 2,
    name : , 
    price : , 
    imageUrl : 
    qunatity: 1;
    price: 100
}

let products = [obj1,obj2, ...]

// products = [...products, newObject]

// create new object
// {

// }


for on products

// create an ne div element and insert 

