import { useState, useEffect } from "react";

export default function Compose() {
  const sender = localStorage.getItem("email") || "";
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");

  const [emails, setEmails] = useState([]);
  // const [decrypted, setDecrypted] = useState("");
  const [showInbox, setShowInbox] = useState(false);
  const [decryptedMessages, setDecryptedMessages] = useState({});

  const handleDecrypt = async (ciphertext) => {
    const res = await fetch("http://localhost:5000/decrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext, key }),
    });
    const data = await res.text();
    setDecryptedMessages((prev) => ({ ...prev, [ciphertext]: data }));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users?email=${sender}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const sendTo = async () => {
    if (!users.includes(receiver)) {
      alert("❌ Cannot send to this email. Not found in system.");
      return;
    }

    const res = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, receiver, message, key }),
    });

    if (res.ok) alert(`✅ Sent to ${receiver}`);
    else alert("❌ Failed to send");
  };


  const loadInbox = () => {
    if (!showInbox) {
      const email = localStorage.getItem("email") || "";
      fetch(`http://localhost:5000/inbox?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setEmails(data);
          setShowInbox(true);
        });
    } else {
      setShowInbox(false);
    }
  };



  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Receiver List */}
        <div className="bg-white p-4 rounded-xl shadow md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Select Receiver
          </h3>
          <ul className="space-y-2">
            {users.map((email) => (
              <li key={email}>
                <button
                  onClick={() => setReceiver(email)}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition"
                >
                  {email}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Compose Panel */}
        <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Compose Secure Message</h2>
          <p className="mb-2 text-gray-500">
            Logged in as: <strong>{sender}</strong>
          </p>

          <label className="block mb-2 text-gray-700">Receiver's Email</label>
          <input
            type="text"
            placeholder="Type or select from list"
            className="w-full border p-2 rounded-lg mb-4"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <label className="block mb-2 text-gray-700">Message</label>
          <textarea
            placeholder="Enter message here"
            className="w-full border p-3 rounded-lg mb-4"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label className="block mb-2 text-gray-700">Encryption Key</label>
          <input
            type="password"
            placeholder="Encryption Key"
            className="w-full border p-2 rounded-lg mb-6"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />

          <div className="flex gap-4">
            <button
              onClick={sendTo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Send Message
            </button>
            <button
              onClick={loadInbox}
              className={`${showInbox
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-green-600 hover:bg-green-700"
                } text-white px-6 py-2 rounded-lg`}
            >
              {showInbox ? "Hide Messages" : "View Messages"}
            </button>
          </div>

          {/* Inbox Panel (Toggle) */}
          {showInbox && (
            <div className="mt-8 border-t pt-4">
              <h3 className="text-xl font-semibold mb-4">📥 Inbox</h3>

              {emails.length > 0 ? (

                <div className="space-y-4">
                  <input
                    placeholder="Enter decryption key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
                  />
                  {emails.map((email, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded-lg border">
                      <p className="text-sm text-gray-700">
                        <strong>From:</strong> {email.sender}
                      </p>
                      <p className="text-xs text-gray-500 break-all">
                        <strong>Encrypted:</strong> {email.message}
                      </p>
                      <button
                        onClick={() => handleDecrypt(email.message)}
                        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                      >
                        Decrypt
                      </button>

                      {decryptedMessages[email.message] && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded">
                          <strong className="text-green-800">Decrypted:</strong>
                          <p className="text-gray-800">{decryptedMessages[email.message]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center italic">
                  📭 No messages found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
