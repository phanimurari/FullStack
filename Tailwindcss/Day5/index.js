const openBtn = document.getElementById('openMenuBtn');
  const closeBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  openBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });