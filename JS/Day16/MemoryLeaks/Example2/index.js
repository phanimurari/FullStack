
    const addBtn = document.getElementById('add');
    const clearBtn = document.getElementById('clear');
    const container = document.getElementById('container');

    // 🔴 Leak: We store references to DOM elements in this array
    const leakyElements = [];

    function handleClick() {
      console.log('Element clicked');
    }

    addBtn.addEventListener('click', () => {
      const div = document.createElement('div');
      div.textContent = 'Click Me!';
      div.style.padding = '10px';
      div.style.margin = '5px';
      div.style.backgroundColor = '#ddd';

      // Attach event listener
      div.addEventListener('click', handleClick);

      // Append to DOM
      container.appendChild(div);

      // ❗ Store a reference in a long-living array
      leakyElements.push(div);
    });

    clearBtn.addEventListener('click', () => {
      // Remove all children from DOM
      container.innerHTML = '';
      // But we don't remove them from leakyElements OR detach their event listeners!
    });


  // clearBtn.addEventListener('click', () => {
  // leakyElements.forEach(el => {
  //   el.removeEventListener('click', handleClick); // detach listener
  // });

  // leakyElements.length = 0; // clear array reference
  // container.innerHTML = ''; // remove from DOM
  // });
