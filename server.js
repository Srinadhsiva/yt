const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
        res.status(200).send({ token });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.some(u => u.username === username);
    if (userExists) {
        res.status(409).send({ message: 'Username already exists' });
    } else {
        users.push({ username, password });
        res.status(200).send({ message: 'Sign-up successful' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
