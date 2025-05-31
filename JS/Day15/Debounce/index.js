function simpleDebounce(callback, delay) {
  let timeoutId;

  return function () {
    console.log(timeoutId, "the timeOutId before")
    clearTimeout(timeoutId); // Cancel previous timer
    timeoutId = setTimeout(callback, delay); // Start new timer
    console.log(timeoutId, "the timeOutId after")
  };
}

const sayHello = () => {
  console.log('Hello! You stopped typing.');
};

const input = document.getElementById('search');
input.addEventListener('input', simpleDebounce(sayHello, 2000));
