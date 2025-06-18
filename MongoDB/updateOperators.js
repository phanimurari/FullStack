// ----------------------------------------
// MongoDB Update Operators - Examples
// ----------------------------------------

// Using database and restoring documents if needed
use studentDB

// Resetting the sample collection (optional for clean slate)
db.students.drop()
db.students.insertMany([
  { name: "Alice", age: 22, course: "JavaScript", status: "active", skills: ["HTML", "CSS"] },
  { name: "Bob", age: 25, course: "Node.js", status: "active", skills: ["Node.js"] },
  { name: "Charlie", age: 21, course: "MongoDB", status: "inactive", skills: ["MongoDB", "Shell"] },
  { name: "David", age: 23, course: "Node.js", status: "active", skills: [] },
  { name: "Eve", age: 20, course: "JavaScript", status: "inactive" }
])

// ----------------------------
// 🛠️ FIELD UPDATE OPERATORS
// ----------------------------

// $set: Set or update a field
// Example: Set "status" to "graduated" for Alice
db.students.updateOne(
  { name: "Alice" },
  { $set: { status: "graduated" } }
)
// 👉 "status" field updated to "graduated"

// $unset: Remove a field from the document
// Example: Remove the "course" field for Eve
db.students.updateOne(
  { name: "Eve" },
  { $unset: { course: "" } }
)
// 👉 "course" field is deleted from Eve’s document

// $rename: Rename a field
// Example: Rename "skills" to "technologies" for Bob
db.students.updateOne(
  { name: "Bob" },
  { $rename: { skills: "technologies" } }
)
// 👉 Field "skills" becomes "technologies"

// $inc: Increment a numeric field
// Example: Increase David's age by 1
db.students.updateOne(
  { name: "David" },
  { $inc: { age: 1 } }
)
// 👉 David's age increased to 24

// $currentDate: Set a field to the current date/time
// Example: Add a new field "lastModified" with current date to Charlie
db.students.updateOne(
  { name: "Charlie" },
  { $currentDate: { lastModified: true } }
)
// 👉 "lastModified" is added with current date

// ----------------------------
// 📚 ARRAY UPDATE OPERATORS
// ----------------------------

// $push: Add a new element to the array
// Example: Add "React" to Alice's skills
db.students.updateOne(
  { name: "Alice" },
  { $push: { skills: "React" } }
)
// 👉 "React" is added to Alice's skills array

// $addToSet: Add only if element doesn't exist (no duplicates)
// Example: Try to add "Shell" to Charlie's skills
db.students.updateOne(
  { name: "Charlie" },
  { $addToSet: { skills: "Shell" } }
)
// 👉 No change since "Shell" already exists

// $pop: Remove first or last element of an array
// Example: Remove last element from Alice’s skills
db.students.updateOne(
  { name: "Alice" },
  { $pop: { skills: 1 } } // 1 = remove last, -1 = remove first
)
// 👉 Last skill is removed from Alice’s array

// $pull: Remove all occurrences of a value from an array
// Example: Remove "MongoDB" from Charlie's skills
db.students.updateOne(
  { name: "Charlie" },
  { $pull: { skills: "MongoDB" } }
)
// 👉 "MongoDB" is removed from Charlie’s skills

// Bonus: Add multiple elements to array using $push + $each
db.students.updateOne(
  { name: "David" },
  { $push: { skills: { $each: ["Express", "MongoDB"] } } }
)
// 👉 Adds "Express" and "MongoDB" to David’s skills
