import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { updateStatusOrder } from "../../../controllers/orderController";

const Order = ({ order }) => {
    const qrRef = useRef(null)
    const [isCancelled, setIsCancelled] = useState(order.isCancelled)
    const handleCancel = async () => {
        try {
            const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?")
            if(isConfirmed) {
                await updateStatusOrder(order)
                setIsCancelled(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleSaveQR = async () => {
        try {
          if (qrRef.current) {
            const dataUrl = await toPng(qrRef.current);
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${order.event_title || "qr-code"}.png`;
            link.click();
          }
        } catch (error) {
          console.error("Error saving QR code:", error);
        }
    };
    const formattedDate = () => {
        if(order.start_date) {
          const options = { day: '2-digit', month: 'long', year: 'numeric' }
          const formatter = new Intl.DateTimeFormat('vi-VN', options)
          return formatter.format(new Date(order.start_date))
        }
        return ''
    }
    const enableCancel = () => {
        return order.cancel_request !== 0
    }
    return (
        <div className="flex flex-1 w-full bg-[#1b1b1b] text-[#FAFAFA] rounded-xl justify-between p-4 text-base font-normal">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-bold text-[#219ce4]">{order.event_title}</div>
                <div className="flex gap-2">
                    <span>Thời gian:</span>
                    <span className="font-semibold">{`${order.start_time || ''}, ${formattedDate()}`}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Chi tiết vé:</span>
                    {order.tickets.filter(ticket => ticket.buy_amount > 0).map((ticket, index) => (
                        <div key={index}>
                            <div className="italic font-semibold">{`${ticket.ticket_name} x${ticket.buy_amount}`}</div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <span>Tổng tiền:</span>
                    <span className="font-semibold">{`${order.total_price.toLocaleString() || ''} VNĐ`}</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-end">
                <button
                    disabled={!enableCancel() || isCancelled}
                    className={`text-center rounded-md font-semibold  py-1 px-3 max-w-28 ${
                        !enableCancel() || isCancelled ? 'bg-[#F3F3F3] text-[#B2BCC2] cursor-not-allowed' : 'text-[#FAFAFA] bg-[#ff4d4f] cursor-pointer hover:bg-red-600'
                    }`}
                    onClick={handleCancel}
                >
                    {isCancelled ? "Đã hủy" : "Hủy vé"}
                </button>
                <div className="flex items-center gap-4">
                    {/* Save Button */}
                    <div
                        onClick={handleSaveQR}
                        className="bg-[#219ce4] rounded-full p-2 hover:bg-sky-400"
                    >
                        <img src="/assets/icons/down-line.svg" alt="download" />
                    </div>
                    {/* QR Code Container */}
                    <div ref={qrRef} className="bg-[#FAFAFA] p-2 rounded-lg">
                        <QRCodeCanvas
                        value={JSON.stringify({
                            order_id: order.id,
                            event_title: order.event_title,
                            tickets: order.tickets,
                        })}
                        size={128}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order