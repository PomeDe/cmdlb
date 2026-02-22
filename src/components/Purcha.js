"use client"

export default function PurchaseHistory({ open, onClose, tickets }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-900 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Purchase History</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {tickets.length === 0 ? (
              <p>No tickets purchased yet.</p>
            ) : (
              tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-xl"
                >
                  <p className="text-lg font-semibold">{ticket.name}</p>
                  <p className="text-sm">
                    {ticket.date} | {ticket.time}
                  </p>

                  <div className="flex flex-row space-x-1 items-center">
                    <p className="text-green-400">Seats:</p>
                    {ticket.seats.map((seat, i) => (
                      <p key={i} className="text-sm">{seat}</p>
                    ))}
                  </div>

                  <p className="text-sm">Total: {ticket.total}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(ticket.purchasedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
