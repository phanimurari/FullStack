use studentDB

db.students.insertMany([
  { name: "Alice", age: 22, course: "JavaScript" },
  { name: "Bob", age: 25, course: "Node.js" },
  { name: "Charlie", age: 21, course: "MongoDB" }
])

// 📌 1. Creating a Basic Index
// Concept: Create an ascending index on the "name" field
db.students.createIndex({ name: 1 })
// Output: MongoDB creates an index to search names faster

// 🔍 Now searching by name is fast:
db.students.find({ name: "Alice" })


// 📌 2. Index on Multiple Fields

// Concept: Create a compound index on "course" and "age"
db.students.createIndex({ course: 1, age: -1 })
// Output: Helps queries that filter/sort by both course and age


db.students.find({ course: "Node.js" }).sort({ age: -1 })

// 📌 3. Unique Index

// Concept: Prevent duplicate values in "email" field
db.students.createIndex({ email: 1 }, { unique: true })
// Output: Ensures each student has a unique email

// 📌 4. Text Index for Searching Text
// Needed for $text search queries on string fields.

// Concept: Enable full-text search on "course" field
db.students.createIndex({ course: "text" })
// Output: You can now use text-based searching
// Concept: Enable full-text search on "course" field
db.students.createIndex({ course: "text" })
// Output: You can now use text-based searching


// Search with $text
db.students.find({ $text: { $search: "MongoDB" } })
// Output: Finds documents with "MongoDB" in the course field

// 🔍 Viewing and Managing Indexes

// Show all indexes on the "students" collection
db.students.getIndexes()

// Delete an index by its name
db.students.dropIndex("name_1")
