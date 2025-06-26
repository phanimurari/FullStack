// Token-Based Authentication:

// It is a more secure and scalable alternative to basic authentication.
// JSON Web Tokens(JWT) are commonly used in Express to implement token-based authentication.
// When the user logs in, the server generates a token containing the user's information.
// Then the server sends the token to the client in response.
// The client stores the token in the form of a cookie or local storage.
// In the subsequent request, the client includes this token in the header, enabling the server to validate the user.
// The features of token-based auth include expiration time and digital signatures enhancing the security and integrity of the data.


//app.js

const jwt = require("jsonwebtoken");

// Generating a token
const token = jwt.sign({ userId: "246" }, "MySecretKey", { expiresIn: "2h" });

// Verifying the token
jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
        // Token is invalid
    } else {
        // Token is valid, and decoded contains user information
    }
});