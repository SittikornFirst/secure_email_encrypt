const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { encrypt, decrypt } = require("./encryptor");
const { users, messages } = require("./messages");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register
app.post('/register', (req, res) => {
    const { email, password } = req.body
    if (users[email]) return res.status(400).send('User already exists')
    users[email] = password
    res.send('Registered successfully')
  })

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!users[email]) return res.status(401).send('User not found')
    if (users[email] !== password) return res.status(401).send('Invalid credentials')
    res.send('Login success')
  })

// Send
app.post("/send", (req, res) => {
  const { receiver, message, key } = req.body;
  const encrypted = encrypt(message, key);
  messages.push({ sender: "demo@secure.com", receiver, message: encrypted });
  res.send("Message sent");
});

// Inbox
app.get("/inbox", (req, res) => {
  const { email } = req.query;
  const inbox = messages.filter((m) => m.receiver === email);
  res.json(inbox);
});

// Decrypt
app.post("/decrypt", (req, res) => {
  const { ciphertext, key } = req.body;
  const plain = decrypt(ciphertext, key);
  res.send(plain);
});
app.get("/users", (req, res) => {
    const me = req.query.email;
    const others = Object.keys(users).filter((email) => email !== me);
    res.json(others);
//   res.json(users);
//   console.log(users);
});
app.get("/admin/messages", (req, res) => {
  // ไม่มี auth จริง ใช้ email = admin เท่านั้น
  const admin = req.query.email;
  if (admin !== "admin@secure.com")
    return res.status(403).send("Not authorized");
  res.json(messages); // [{sender, receiver, message}]
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
