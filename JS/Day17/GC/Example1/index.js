let bigObject = null;

    document.getElementById('createBtn').addEventListener('click', () => {
      bigObject = {
        name: 'Memory Hero',
        data: new Array(1_000_000).fill('💾') // 1 million entries
      };
      console.log('✅ Big object created and held in memory');
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
      bigObject = null;
      console.log('🧹 Object reference cleared – ready for GC');
    });


// 🔍 What Happens Here?
// You create a big object with lots of data.

// You wait 2 seconds and then set the object to null.

// At that point, no variable points to that object anymore.

// JavaScript sees it's unreachable, and the Garbage Collector will clean it up at some point (usually soon after memory pressure).