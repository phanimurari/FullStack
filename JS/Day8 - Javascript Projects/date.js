// ✅ Date Object Creation
const now = new Date(); // Current date and time

console.log("Current Date & Time:", now);

console.log("Milliseconds since Jan 1, 1970:", Date.now());
console.log("Full Year:", now.getFullYear());       // getFullYear()
console.log("Month (0-11):", now.getMonth());       // getMonth()
console.log("Date (1-31):", now.getDate());         // getDate()
console.log("Day (0-6):", now.getDay());            // getDay()
console.log("Hours (0-23):", now.getHours());       // getHours()
console.log("Minutes (0-59):", now.getMinutes());   // getMinutes()
console.log("UTC Date (1-31):", now.getUTCDate());  // getUTCDate()

// ✅ Setting values using methods
now.setFullYear(2023);   // setFullYear()
now.setMonth(11);        // setMonth() - December (0-indexed)
now.setDate(25);         // setDate()
now.setUTCDate(20);      // setUTCDate()

console.log("Updated Date:", now);
