import Button from '../shared/button'
import EVENTS from '../../../mock_data/event.json'

export default function TicketFrame({id}) {
    const event = EVENTS.find((event) => event.id === parseInt(id));

    return (
        <div className="relative flex w-full h-full justify-center items-center flex-shrink-0 bg-[#219ce4] py-20 px-[75px]">
            <div className="relative flex w-full h-full items-start overflow-hidden">
                <img src="/assets/ticket-frame.svg" alt="ticket-frame" className="z-0 drop-shadow-sm" />
                <img
                    src={event.image}
                    alt="event-banner"
                    className="z-10 absolute w-[848px] h-[478px] object-cover mask"
                    style={{
                        maskImage: 'url("/assets/ticket-frame.svg")',
                        maskSize: 'cover',
                    }}
                />
                <div className="z-10 absolute flex flex-col right-8 top-8 w-[425px] h-[416px] text-left">
                    <span className="text-black text-2xl font-bold mb-5">
                        {event.title}
                    </span>
                    <div className="flex flex-col flex-grow items-start gap-2">
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/profile-2user.svg" alt="organizer" width={20} height={20} />
                            <span className="text-black text-sm font-normal">
                                {event.organizer.name}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/ticket.svg" alt="time" width={20} height={20} />
                            <span className="text-black text-sm font-normal">
                                {event.time}, {event.date}
                            </span>
                        </div>
                        <div className="flex flex-row items-start gap-3">
                            <img src="/assets/icons/calendar.svg" alt="location" width={20} height={20} />
                            <div className="flex flex-col items-start text-black text-sm font-normal">
                                <span>{event.location.name}</span>
                                <span>{event.location.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-end justify-between mb-5">
                        <p className="text-black text-[16px] leading-[12px] font-bold">Giá vé từ</p>
                        <p className="text-[#219ce4] text-[32px] leading-[22px] font-bold">{event.price} VND</p>
                    </div>
                    <Button title="Mua vé ngay" bgColor="#1b1b1b" textColor="#fff" />
                </div>
            </div>
        </div>
    )
}