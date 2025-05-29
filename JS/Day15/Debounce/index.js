function simpleDebounce(callback, delay) {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId); // Cancel previous timer
    timeoutId = setTimeout(callback, delay); // Start new timer
  };
}

const sayHello = () => {
  console.log('Hello! You stopped typing.');
};

const input = document.getElementById('search');
input.addEventListener('input', simpleDebounce(sayHello, 2000));
