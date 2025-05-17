const html = document.documentElement;
const toggleButton = document.getElementById('toggle-theme');

// Set initial theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
} else {
  html.classList.remove('dark');
}

// Toggle handler
toggleButton.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
