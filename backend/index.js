const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { encrypt, decrypt, hashPassword, verifyPassword } = require("./encryptor");
const { users, messages } = require("./messages");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (users[email]) return res.status(400).send('User already exists');

  try {
    const hashed = await hashPassword(password);
    users[email] = { password: hashed, role: "user" }; // Default to user
    res.send('Registered successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (!user) return res.status(401).send('User not found');

  try {
    const valid = await verifyPassword(password, user.password);
    if (!valid) return res.status(401).send('Invalid credentials');

    res.json({ message: 'Login success', role: user.role });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Send message
app.post("/send", (req, res) => {
  const { sender, receiver, message, key } = req.body;
  if (!users[sender]) return res.status(401).send("Sender not found");
  if (!users[receiver]) return res.status(401).send("Receiver not found");

  const encrypted = encrypt(message, key);
  messages.push({ sender, receiver, message: encrypted });
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

// List other users (for receiver selection)
app.get("/users", (req, res) => {
  const me = req.query.email;
  const others = Object.keys(users).filter((email) => email !== me);
  res.json(others);
});

// Admin logs
app.get("/admin/logs", (req, res) => {
  const { email } = req.query;
  if (!users[email] || users[email].role !== "admin") {
    return res.status(403).send("Not authorized");
  }
  res.json(messages);
});

// Admin user list
app.get('/admin/users', (req, res) => {
  const { email } = req.query;
  if (!users[email] || users[email].role !== "admin") {
    return res.status(403).send("Not authorized");
  }

  const userList = Object.entries(users).map(([email, data]) => ({
    email,
    password: data.password,
    role: data.role
  }));

  res.json(userList);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
