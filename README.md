# Secure Email System with Confidentiality

A simple full-stack web application that simulates an **email system with confidentiality** using encryption. Users must **register and log in**, then can **send encrypted messages** to other registered users and **decrypt messages using a shared key**.

---

## Features

1. Register and log in
2. Send AES-encrypted messages
3. Decrypt messages using the correct key
4. Inbox is shown within the Compose page
5. Recipient must be selected from registered users only
6. Simple and responsive UI with Tailwind CSS

---

## Technologies Used

| Area          | Stack                         |
|---------------|-------------------------------|
| **Frontend**  | React + Vite + Tailwind CSS   |
| **Backend**   | Node.js + Express             |
| **Encryption**| AES-256-CBC   |
| **Storage**   |  JavaScript objects  |

---

## How to run
### 1. Backend Setup

```bash
cd backend
npm install
node index.js
```

### 2. Frontend Setup

```bash
cd secure-email
npm install
npm run dev
```
