import React from "react"

const FirstStep = ({ selectedTickets, setSelectedTickets, showImage }) => {
  const handleTicketChange = (ticketId, changeAmount) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.ticket_id === ticketId
          ? {
              ...ticket,
              amount: Math.max(0, Math.min(ticket.amount + changeAmount, ticket.max)),
            }
          : ticket
      )
    )
  }
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className='text-[#1B1B1B] text-xl font-extrabold'>Chọn vé</div>
        <div className='text-[#AEAEAE] text-base font-normal'>Hãy chọn loại vé và số lượng vé bạn muốn mua!</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className='text-[#1B1B1B] text-lg font-bold'>Sơ đồ chỗ ngồi</div>
        <div className="relative flex w-full border border-[#219ce4] rounded-xl p-2">
          <img
            src={showImage}
            alt="Show Preview"
            className="object-contain w-full h-full rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className='text-[#1B1B1B] text-lg font-bold'>Loại vé</div>
        <div className="flex flex-col gap-4">
          {selectedTickets.map((ticket) => {
            const isSoldOut = ticket.max > 0
            return (
            <div
              key={ticket.ticket_id}
              className={`flex justify-between gap-4 items-center px-6 py-4 rounded-2xl ${
                isSoldOut ? "bg-[#1b1b1b] text-[#FAFAFA]" : "border border-[#B2BCC2] text-[#1b1b1b]"
              }`}
            >
              <div>
                <div className={`text-xl font-bold ${isSoldOut ? "text-[#219ce4]" : ""}`}>
                  {ticket.name} | {ticket.price.toLocaleString()} đ
                </div>
                <div className='italic text-sm font-normal'>{ticket.description}</div>
              </div>
              {isSoldOut ? (
                <div className="flex justify-center items-center text-[#FAFAFA] text-xl font-bold">
                  <button
                    className={`w-12 h-12 rounded-full flex justify-center items-center ${
                      ticket.amount <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#1b1b1b] border border-[#FAFAFA] hover:bg-white hover:text-red-500"
                    }`}
                    onClick={() => handleTicketChange(ticket.ticket_id, -1)}
                    disabled={ticket.amount <= 0}
                  >
                    -
                  </button>
                  <span className='px-5'>{ticket.amount || 0}</span>
                  <button
                    className={`w-12 h-12 rounded-full flex justify-center items-center ${
                      ticket.amount >= ticket.max
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#219ce4] hover:bg-sky-400"
                    }`}
                    onClick={() => handleTicketChange(ticket.ticket_id, 1)}
                    disabled={ticket.amount >= ticket.max}
                  >
                    +
                  </button>
                </div>
              ) : (
                <span className='text-xl font-bold'>Hết vé</span>
              )}
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FirstStep