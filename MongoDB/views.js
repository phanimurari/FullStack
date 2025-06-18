// 📘 Example: Creating a View in MongoDB
// Let’s say we have a students collection:


db.students.insertMany([
  { name: "Alice", age: 22, status: "active" },
  { name: "Bob", age: 25, status: "inactive" },
  { name: "Charlie", age: 21, status: "active" }
])


// 📄 Create a View showing only active students

// Concept: Create a view that shows only active students
db.createView("activeStudentsView", "students", [
  { $match: { status: "active" } }
])
// Output: Creates a view called "activeStudentsView" that shows only documents where status = "active"


// 🔍 Query the View

db.activeStudentsView.find()

// 👉 Output:

{ name: "Alice", age: 22, status: "active" }
{ name: "Charlie", age: 21, status: "active" }

// ✔️ The view updates automatically if new active students are inserted into the students collection.

// Drop a View


db.activeStudentsView.drop();