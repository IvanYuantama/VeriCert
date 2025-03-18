const express = require("express");
const router = express.Router();
const sample = require("../Models/Certidetails");
const path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = "Blockchain_Group14";

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'issueCertificate.html'));
});


router.post('/certificate', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const details = await sample.create(data);
        res.status(201).redirect('/thank-you');
    }
    catch (error) {
        console.log(error);
        res.status(500).json();
    }
});


router.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formsubmitted.html'));
});


// router.get("certificate/:id",async (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'view.html'));

// });

router.get('/certificate/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching certificate with ID: ${id}`);

    try {
        const certificate = await sample.findOne({ certiid: id });
        if (!certificate) {
            console.log(`Certificate not found for ID: ${id}`);
            return res.status(404).json({ message: 'Certificate not found' });
        }
        console.log(`Certificate found: ${certificate}`);
        res.json(certificate);
    } catch (error) {
        console.log(`Error fetching certificate: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});
module.exports = router;