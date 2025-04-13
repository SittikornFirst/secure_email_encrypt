# 📧 Secure Email System with Confidentiality

A simple full-stack web application that simulates an **email system with confidentiality** using encryption. Users must **register and log in**, then can **send encrypted messages** to other registered users and **decrypt messages using a shared key**.

---

## 🔐 Features

- ✅ Register and log in
- ✅ Send AES-encrypted messages
- ✅ Decrypt messages using the correct key
- ✅ Inbox is shown within the Compose page
- ✅ Recipient must be selected from registered users only
- ✅ Simple and responsive UI with Tailwind CSS

---

## 🧑‍💻 Technologies Used

| Area          | Stack                         |
|---------------|-------------------------------|
| **Frontend**  | React + Vite + Tailwind CSS   |
| **Backend**   | Node.js + Express             |
| **Encryption**| AES-256-CBC (Crypto module)   |
| **Storage**   | In-memory JavaScript objects  |

---

## How to run

### 1️⃣ Backend Setup

```bash
cd backend

npm install

node index.js
```

### 2️⃣ Frontend Setup

```bash
cd secure-email

npm install

npm run dev
```
