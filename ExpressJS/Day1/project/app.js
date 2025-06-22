require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB URL
const mongoDBURL = 'mongodb://127.0.0.1:27017/studentDB';

app.use(express.json())

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ Connection Error:", err));

// useNewUrlParser: true
// This option used to tell Mongoose to use the new MongoDB connection string parser, which was better at handling special characters and other parsing issues.
// ✅ Now deprecated since MongoDB Node Driver v4.

// useUnifiedTopology: true
// This told Mongoose to use the new server discovery and monitoring engine, which made connections more reliable.
// ✅ Also deprecated since v4.

// Routes
app.get('/', (req, res) => {
    res.send('Connected to MongoDB!');
});



// Define Mongoose Schema & Model
const studentSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String
}, {collection: 'validatedStudents'});

const Student = mongoose.model('validatedStudents', studentSchema);

// 👉 Endpoint to fetch all students
app.get('/students', middleWare, async (req, res) => {
    try {
        const students = await Student.find(); // Get all students
        res.status(200).json(students);        // Respond with student data
    } catch (err) {
        res.status(500).json({ message: "Server error while fetching students." });
    }
});

app.post("/poststudent", async(req, res) => {
  try {
    console.log(req.body, "the req")
    const {name, age, email} = req.body;
    if(!name || !age || !email){
       return res.status(400).json({message: "Please fill all fields"});
    }
    const newStudent = new Student({name, age, email});
    await newStudent.save()
    res.status(201).json({message: "Student created successfully", newStudent});
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error while fetching students.", error });
  }
})

app.get('/students/age22plus', async (req, res) => {
    try {
        const students = await Student.find({ age: { $gte: 22 } });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: "Error fetching students with age ≥ 20" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
