// Create a WeakMap to track click counts for DOM elements
const clickCounts = new WeakMap();

// Get all buttons with class "trackable"
const buttons = document.querySelectorAll(".trackable");

buttons.forEach(button => {
  // Initialize each button's click count
  clickCounts.set(button, 0);

  button.addEventListener("click", () => {
    // Get current count or 0 if not present
    let count = clickCounts.get(button) || 0;
    count++;
    clickCounts.set(button, count);

    // Show it in console
    console.log(`"${button.textContent}" clicked ${count} times`);
  });
});

// BONUS (just to demonstrate memory behavior - not visible to user):
setTimeout(() => {
  console.log("Removing button 3 from DOM...");
  const btn3 = buttons[2];
  btn3.remove(); // this removes reference from DOM

  // Since WeakMap doesn't prevent garbage collection, btn3's data can now be cleaned up
}, 10000);
