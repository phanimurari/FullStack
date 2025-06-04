
    // Inefficient Code:

    
    // const addBtn = document.getElementById('add');
    // const clearBtn = document.getElementById('clear');
    // const container = document.getElementById('container');

    // // This leaks because it lives forever and holds closures
    // const leakedReferences = [];

    // function createUserCard(index) {
    //   const heavyData = new Array(5000).fill('🔥' + index);

    //   const card = document.createElement('div');
    //   card.className = 'user-card';
    //   card.textContent = `User #${index}`;
    //   card.style.padding = '10px';
    //   card.style.margin = '5px';
    //   card.style.border = '1px solid #ccc';

    //   const clickHandler = () => {
    //     console.log(`User #${index} clicked`, heavyData[0]); // memory closure
    //   };

    //   card.addEventListener('click', clickHandler);

    //   // ❌ Leak: We store everything and never release it
    //   leakedReferences.push({ card, clickHandler });

    //   return card;
    // }

    // addBtn.addEventListener('click', () => {
    //   for (let i = 0; i < 1000; i++) {
    //     const card = createUserCard(i);
    //     container.appendChild(card);
    //   }
    // });

    // // ❌ Doesn't remove event listeners or clear references
    // clearBtn.addEventListener('click', () => {
    //   container.innerHTML = '';
    //   console.log('❌ Cleared from DOM but not memory!');
    // });


    // Efficient Code

    const addBtn = document.getElementById('add');
    const clearBtn = document.getElementById('clear');
    const container = document.getElementById('container');
    const cards = [];

    function createUserCard(index) {
      const heavyData = new Array(5000).fill('🔥' + index);

      const card = document.createElement('div');
      card.className = 'user-card';
      card.textContent = `User #${index}`;
      card.style.padding = '10px';
      card.style.margin = '5px';
      card.style.border = '1px solid #ccc';

      const clickHandler = () => {
        console.log(`User #${index} clicked`, heavyData[0]); // closure with large data
      };

      card.addEventListener('click', clickHandler);

      // store reference for cleanup
      cards.push({ card, clickHandler });

      return card;
    }

    addBtn.addEventListener('click', () => {
      for (let i = 0; i < 1000; i++) {
        const card = createUserCard(i);
        container.appendChild(card);
      }
    });

    clearBtn.addEventListener('click', () => {
      cards.forEach(({ card, clickHandler }) => {
        card.removeEventListener('click', clickHandler);
      });
      cards.length = 0;
      container.innerHTML = '';
      console.log('✅ Cleaned up efficiently');
    });
