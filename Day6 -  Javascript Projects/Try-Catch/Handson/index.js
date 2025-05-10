
    const uploadBtn = document.getElementById('uploadBtn');
    const loader = document.getElementById('loader');
    const statusEl = document.getElementById('status');

    function simulateFileUpload() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = false // Random outcome
          success ? resolve("✅ Upload successful!") : reject("❌ Upload failed!");

        //   if(condition) {

        //   }
        //   else {

        //   }
        }, 2000);
      });
    }

    uploadBtn.addEventListener('click', () => {
      statusEl.textContent = '';
      statusEl.className = '';
      loader.style.display = 'block';

      simulateFileUpload()
        .then((message) => {
          statusEl.textContent = message;
          statusEl.classList.add('success');
        })
        .catch((error) => {
          statusEl.textContent = error;
          statusEl.classList.add('error');
        })
        .finally(() => {
          loader.style.display = 'none';
        });
    });
