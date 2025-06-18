// ----------------------------------------
// MongoDB Query Operators - Examples
// ----------------------------------------

// Use the studentDB and ensure data exists
use studentDB

// Re-insert baseline documents (if starting fresh)
db.students.insertMany([
  { name: "Alice", age: 22, course: "JavaScript", status: "active" },
  { name: "Bob", age: 25, course: "Node.js", status: "active" },
  { name: "Charlie", age: 21, course: "MongoDB", status: "inactive" },
  { name: "David", age: 23, course: "Node.js", status: "active" },
  { name: "Eve", age: 20, course: "JavaScript", status: "inactive" }
])

// ----------------------------
// 📘 COMPARISON OPERATORS
// ----------------------------

// $eq: Find students with age exactly 22
db.students.find({ age: { $eq: 22 } }) 
// 👉 Finds Alice

// $ne: Find students whose course is NOT "Node.js"
db.students.find({ course: { $ne: "Node.js" } })
// 👉 Returns all except Bob and David

// $gt: Find students older than 22
db.students.find({ age: { $gt: 22 } })
// 👉 Returns Bob and David

// $gte: Find students aged 22 or older
db.students.find({ age: { $gte: 22 } })
// 👉 Returns Alice, Bob, David

// $lt: Find students younger than 22
db.students.find({ age: { $lt: 22 } })
// 👉 Returns Charlie, Eve

// $lte: Find students aged 21 or younger
db.students.find({ age: { $lte: 21 } })
// 👉 Returns Charlie, Eve

// $in: Find students enrolled in either "JavaScript" or "MongoDB"
db.students.find({ course: { $in: ["JavaScript", "MongoDB"] } })
// 👉 Returns Alice, Charlie, Eve

// ----------------------------
// 📘 LOGICAL OPERATORS
// ----------------------------

// $and: Students aged over 22 AND status is active
db.students.find({
  $and: [
    { age: { $gt: 22 } },
    { status: "active" }
  ]
})
// 👉 Returns Bob, David

// $or: Students who are either inactive OR learning MongoDB
db.students.find({
  $or: [
    { status: "inactive" },
    { course: "MongoDB" }
  ]
})
// 👉 Returns Charlie, Eve

// $nor: Students who are NOT inactive AND NOT in JavaScript course
db.students.find({
  $nor: [
    { status: "inactive" },
    { course: "JavaScript" }
  ]
})
// 👉 Returns Bob, David

// $not: Students whose age is NOT greater than 22
db.students.find({
  age: { $not: { $gt: 22 } }
})
// 👉 Returns Alice, Charlie, Eve

// ----------------------------
// 📘 EVALUATION OPERATORS
// ----------------------------

// $regex: Find students whose names start with 'A'
db.students.find({
  name: { $regex: /^A/ }
})
// 👉 Returns Alice

// $regex (case-insensitive): Find names ending with "e"
db.students.find({
  name: { $regex: /e$/i }
})
// 👉 Returns Alice, Eve, Charlie

// $text: Perform a full-text search (requires a text index first)
db.students.createIndex({ course: "text" })  // 💡 One-time setup
db.students.find({ $text: { $search: "MongoDB" } })
// 👉 Returns Charlie (course = "MongoDB")

// $where: Use JavaScript expression to filter (not recommended in production)
db.students.find({
  $where: "this.age < 22 && this.status === 'inactive'"
})
// 👉 Returns Eve

// ✅ Bonus 
// $where is slow and not recommended for production but is great for demos.
// $text requires a text index, and only one text index per collection is allowed.
// $regex is useful for pattern matching and case-insensitive searches.