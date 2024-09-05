const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;
// Middleware
app.use(express.json()); // Express built-in middleware to parse JSON
app.use(cors());
// In-memory storage for demonstration purposes
let users = {};
// POST endpoint to store data
app.post("/api/userpost", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users[email] = { ...req.body, password: hashedPassword };
    res.status(200).send({ message: "User data received" });
});
// GET endpoint to retrieve data
app.get("/api/retrieveData", (req, res) => {
    const userData = users[req.query.email];
    if (userData) {
        res.status(200).send(userData);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});
// GET endpoint to check if email exists
app.get("/api/checkemail", (req, res) => {
    const userEmail = req.query.email;
    const exists = users.hasOwnProperty(userEmail);
    res.status(200).send({ exists });
});
// POST endpoint to handle login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users[email];
    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(400).send({ message: "Incorrect password" });
        }
    } else {
        res.status(400).send({ message: "Email does not exist" });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
