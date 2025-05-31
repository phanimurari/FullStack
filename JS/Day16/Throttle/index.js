function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
  
    // console.log(fn, "the function")
    // console.log(...args, "the args")
    // console.log(this, "this ")

    if (!inThrottle) {
      fn.apply(this, args); // Call the function
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false; // Allow next call after limit
      }, limit);
    }
  };
}



function logMousePosition(e) {
  console.log('Mouse moved at:', e.clientX, e.clientY);
  //Expensive 
}


const throttledMouseLogger = throttle(logMousePosition, 3000);


document.querySelector('div').addEventListener('mousemove', throttledMouseLogger);
