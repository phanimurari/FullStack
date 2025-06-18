// Concept: Schema Validation - Enforce rules so documents follow a specific structure
// Explanation: MongoDB is schemaless by default, but using $jsonSchema, we can validate document structure like required fields, types, value ranges, etc.


// Step 1: Switch to DB and Drop Collection (start clean)
use studentDB
db.validatedStudents.drop()


// Step 2: Create Collection with Schema Validation
db.createCollection("validatedStudents", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        age: {
          bsonType: "int",
          minimum: 18,
          maximum: 60,
          description: "must be an integer between 18 and 60"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "must be a valid email format"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})
// Output: Creates collection 'validatedStudents' with enforced structure


// ✅ Valid Document Example

// Concept: Insert valid document that matches schema
db.validatedStudents.insertOne({
  name: "Alice",
  age: 25,
  email: "alice@example.com"
})
// Output: Success ✔️ Document is inserted


// ❌ Invalid Document Example 1 – Missing Required Field

// Concept: Insert document missing required "email" field
db.validatedStudents.insertOne({
  name: "Bob",
  age: 30
})
// Output: ❌ Fails — Document must include "email"


// ❌ Invalid Document Example 2 – Wrong Data Type?

// Concept: "age" should be integer, but provided as string
db.validatedStudents.insertOne({
  name: "Charlie",
  age: "30", // Invalid: Should be an int
  email: "charlie@example.com"
})
// Output: ❌ Fails — age must be an integer


// ❌ Invalid Document Example 3 – Invalid Email Format
// Concept: Email format does not match the pattern
db.validatedStudents.insertOne({
  name: "David",
  age: 28,
  email: "not-an-email"
})
// Output: ❌ Fails — invalid email pattern


// 🧠 Schema Validation Summary

// | Feature            | Description                                       |
// | ------------------ | ------------------------------------------------- |
// | `$jsonSchema`      | JSON-style validator to enforce schema            |
// | `bsonType`         | Type (e.g. string, int, object)                   |
// | `required`         | Fields that must exist                            |
// | `pattern`          | Regex check for strings (e.g. emails)             |
// | `minimum/maximum`  | Range validation for numbers                      |
// | `validationLevel`  | strict (default) or moderate                      |
// | `validationAction` | "error" (reject) or "warn" (log but allow insert) |
