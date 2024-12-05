import { useNavigate } from "react-router-dom"
import Button from "../shared/button"
import EVENTS from '../../../mock_data/event.json'

function TicketInfoItem({ ticket, event_id }) {
    const navigate = useNavigate()
    
    return (
        <div className={`flex flex-row w-full min-w-[1200px] items-center justify-between px-6 py-5 rounded-2xl ${ticket.isSoldOut ? 'bg-[#b2bcc2]' : 'bg-[#1b1b1b]'} text-[#fafafa] text-xl leading-7 font-semibold`}>
            <span>{ticket.time}, {ticket.date}</span>
            {ticket.isSoldOut ? (
                <><span className="min-w-[124px]">Hết vé</span></>
            ) : (
                <Button title={'Mua vé ngay'} bgColor={'#219CE4'} textColor={'#fafafa'} onClick={() => navigate(`/booking/event=${event_id}`)} />
            )}
        </div>
    )
}

export default function TicketInfo({ id }) {
    const event = EVENTS.find((event) => event.id === parseInt(id));

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="flex flex-col items-start gap-5 w-full max-w-[1200px] mx-auto">
            {event.tickets.map((ticket) => (
                <TicketInfoItem key={ticket.id} ticket={ticket} event_id={id} />
            ))}
        </div>
    )
}