import { useEffect, useState } from 'react'

export default function AdminView() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/admin/logs?email=admin@secure.com')
      .then(res => res.json())
      .then(data => setMessages(data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">📋 Admin: Message Log</h2>
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
