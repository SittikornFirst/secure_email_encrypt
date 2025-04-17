import { useEffect, useState } from 'react'

export default function AdminView() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const adminEmail = localStorage.getItem("email");

  useEffect(() => {
    fetch(`http://localhost:5000/admin/logs?email=${adminEmail}`)
      .then(res => res.json())
      .then(data => setMessages(data));

    fetch(`http://localhost:5000/admin/users?email=${adminEmail}`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">👤 Registered Users</h2>
        <h2 className="text-xl font-bold mb-4">Total Users: {users.length}</h2>
        <table className="w-full text-sm table-auto border border-collapse border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Password</th>
              <th className="border px-4 py-2 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2 break-all text-gray-600">{u.password}</td>
                <td className="border px-4 py-2 text-blue-600">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">📋 Message Log</h2>
        <div className="space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className="border border-gray-300 p-4 rounded-lg bg-gray-50">
              <p><strong>From:</strong> {m.sender}</p>
              <p><strong>To:</strong> {m.receiver}</p>
              <p className="text-sm break-all text-gray-600"><strong>Encrypted:</strong> {m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
