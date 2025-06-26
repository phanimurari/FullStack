//app.js

// Basic Authentication
// Basic Authentication is one of the simplest and most widely used auth strategy across the web.
// In express, it involves sending the user's credentials i.e username, and password with each HTTP request coded in "base64-encoded format"
// Though it is easy to implement, its base64-encoded format can be easily decoded so it is recommended to use this method only when coupled with a secure transport layer such as HTTPS.
// You can use express-basic-auth middleware in Express to implement this authentication method.

const express = require("express");
const basicAuth = require("express-basic-auth");

const app = express();

// Define the basic authentication middleware
const authMiddleware = basicAuth({
  users: {
    alice: "wonderland",
    bob: "builder",
    charlie: "chocolate",
  },
  challenge: true,
  unauthorizedResponse: "Unauthorized access. Please provide valid credentials.",
});

// Apply the middleware only to the specific route
app.get("/secure-data", authMiddleware, (req, res) => {
  res.send("This is secure data that requires valid credentials.");
});

const port = 8005;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// TESTING CURLS

curl -u alice:wonderland -X POST http://localhost:8005/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express"}'

// curl -u bob:builder http://localhost:8005/todos
