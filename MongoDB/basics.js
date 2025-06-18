// ----------------------------------------
// MongoDB Basics Command Reference
// ----------------------------------------

// 1. Switch or Create a Database
use studentDB

// 2. Insert a Single Document (Creates collection implicitly if not present)
db.students.insertOne({ name: "Alice", age: 22 })

// 3. Insert Multiple Documents
db.students.insertMany([
  { name: "Bob", age: 24, course: "Node.js" },
  { name: "Charlie", age: 21, course: "MongoDB" }
])

// 4. Find All Documents
db.students.find()

// 5. Find One Document Matching a Filter
db.students.findOne({ name: "Bob" })

// 6. Find Documents with a Condition (Example: age > 22)
db.students.find({ age: { $gt: 22 } })

// 7. Update One Document
db.students.updateOne(
  { name: "Bob" },
  { $set: { age: 25 } }
)

// 8. Update Multiple Documents
db.students.updateMany(
  {},
  { $set: { status: "active" } }
)

// 9. Delete One Document
db.students.deleteOne({ name: "Charlie" })

// 10. Delete Multiple Documents with a Filter
db.students.deleteMany({ status: "inactive" })

// 11. Count Number of Documents
db.students.countDocuments()

// 12. Add a Field to All Documents
db.students.updateMany({}, { $set: { enrolled: true } })

// 13. Remove a Field from All Documents
db.students.updateMany({}, { $unset: { enrolled: "" } })

// 14. Create an Index
db.students.createIndex({ name: 1 })

// 15. View All Indexes
db.students.getIndexes()

// 16. Drop the Index by Name
db.students.dropIndex("name_1")

// 17. Drop a Collection
db.students.drop()

// 18. Drop the Database
db.dropDatabase()

// 19. Show All Databases
show dbs

// 20. Show All Collections in Current DB
show collections

// 21. Check Current Database
db

// 22. Rename a Collection
db.students.renameCollection("student_profiles")

// 23. Aggregate Example (Group by Course)
db.students.aggregate([
  { $group: { _id: "$course", count: { $sum: 1 } } }
])

// 24. Sorting Documents (by age ascending)
db.students.find().sort({ age: 1 })

// 25. Limiting Results
db.students.find().limit(2)

// 26. Projection (show only name and age)
db.students.find({}, { name: 1, age: 1, _id: 0 })
