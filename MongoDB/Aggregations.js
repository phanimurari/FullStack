// 📂 Sample Data (posts collection)
// First, let’s insert some sample documents:

use studentDB

db.posts.drop()

db.posts.insertMany([
  { title: "Intro to MongoDB", category: "Database", likes: 5, authorId: 1 },
  { title: "Node.js Crash Course", category: "Backend", likes: 8, authorId: 2 },
  { title: "Frontend with React", category: "Frontend", likes: 12, authorId: 3 },
  { title: "Mastering Aggregation", category: "Database", likes: 1, authorId: 1 },
  { title: "JavaScript Deep Dive", category: "Frontend", likes: 3, authorId: 2 },
  { title: "Scaling with Docker", category: "DevOps", likes: 6, authorId: 3 }
])

// Concept: $match - Filter documents based on a condition
db.posts.aggregate([
  { $match: { likes: { $gt: 5 } } }
])
// Output: Returns posts where likes > 5

// Concept: $group - Group documents and perform aggregation like sum, count, etc.
db.posts.aggregate([
  {
    $group: {
      _id: "$category",
      totalLikes: { $sum: "$likes" }
    }
  }
])
// Output:
// { _id: "Frontend", totalLikes: 15 }
// { _id: "Database", totalLikes: 6 }
// { _id: "Backend", totalLikes: 8 }
// { _id: "DevOps", totalLikes: 6 }

// Concept: $sort - Sort documents based on a field
db.posts.aggregate([
  { $sort: { likes: -1 } }
])
// Output: Posts sorted by likes in descending order

// Concept: $limit - Limit the number of documents returned
db.posts.aggregate([
  { $sort: { likes: -1 } },
  { $limit: 3 }
])
// Output: Top 3 posts with the highest likes

// Concept: $project - Include, exclude, or rename fields in the result
db.posts.aggregate([
  {
    $project: {
      _id: 0,
      title: 1,
      likes: 1
    }
  }
])
// Output: Only title and likes fields are included

// Concept: $addFields - Add new fields or modify existing ones
db.posts.aggregate([
  {
    $addFields: {
      popularity: {
        $cond: { if: { $gt: ["$likes", 5] }, then: "High", else: "Low" }
      }
    }
  }
])
// Output: Adds a new field "popularity" as "High" or "Low" based on likes

// Concept: $count - Count number of documents in the pipeline
db.posts.aggregate([
  { $match: { likes: { $gt: 5 } } },
  { $count: "popularPosts" }
])
// Output: { popularPosts: 4 } — number of posts with likes > 5

// Concept: $lookup - Join data from another collection (foreign key-like behavior)
db.posts.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    }
  }
])
// Output: Adds an "author" array with matching user documents

// Concept: $out - Export the result of aggregation to a new collection
db.posts.aggregate([
  { $match: { likes: { $gt: 5 } } },
  { $out: "popularPosts" }
])
// Output: Creates a new collection "popularPosts" with the filtered data


// Concept: Multi-stage aggregation pipeline
// Explanation: We'll find the top 2 most popular posts in the "Frontend" category, 
// along with the author's name and a new field called "popularityScore".

db.posts.aggregate([
  // Stage 1: Join authors from the "users" collection
  {
    $lookup: {
      from: "users",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    }
  },
  
  // Stage 2: Filter only "Frontend" category posts
  {
    $match: { category: "Frontend" }
  },

  // Stage 3: Add a computed field based on likes
  {
    $addFields: {
      popularityScore: {
        $cond: { if: { $gt: ["$likes", 5] }, then: "🔥 Hot", else: "📈 Growing" }
      }
    }
  },

  // Stage 4: Project selected fields and reshape output
  {
    $project: {
      _id: 0,
      title: 1,
      likes: 1,
      popularityScore: 1,
      authorName: { $arrayElemAt: ["$author.name", 0] }
    }
  },

  // Stage 5: Sort by likes descending
  {
    $sort: { likes: -1 }
  },

  // Stage 6: Limit to top 2 results
  {
    $limit: 2
  }
])


