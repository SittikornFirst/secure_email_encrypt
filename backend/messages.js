const bcrypt = require("bcrypt");

const plainUsers = {
  "admin@secure.com": { password: "admin123", role: "admin" },
  "demo@gmail.com": { password: "1234", role: "user" },
  "alice@gmail.com": { password: "1234", role: "user" },
  "bob@gmail.com": { password: "1234", role: "user" },
};

const users = {};
const messages = [];

// Hash passwords and store role
for (const [email, { password, role }] of Object.entries(plainUsers)) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  users[email] = { password: hashed, role };
}

module.exports = { users, messages };
