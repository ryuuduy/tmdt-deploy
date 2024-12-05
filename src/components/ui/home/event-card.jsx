import Button from "../shared/button";

export default function EventCard({ event, onClick }) {
    const getSmallestPrice = (shows) => {
        let smallestPrice = Infinity;
        shows.forEach(show => {
            show.ticket_types.forEach(ticket => {
                if (ticket.price < smallestPrice) {
                    smallestPrice = ticket.price;
                }
            });
        });
        return smallestPrice;
    };

    const getRecentDate = (shows) => {
        let recentDate = new Date(0);
        shows.forEach(show => {
            const startDate = new Date(show.start_date);
            if (startDate > recentDate) {
                recentDate = startDate;
            }
        });
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return recentDate.toLocaleDateString(undefined, options);
    };

    const smallestPrice = getSmallestPrice(event.shows);
    const recentDate = getRecentDate(event.shows);

    return (
        <div className="flex relative rounded-3xl min-w-[405px] max-w-[405px] min-h-[480px] border border-black bg-[#fafafa]">
            <div className="absolute top-0 inset-x-0 rounded-t-3xl">
                <img src={event.image} alt={event.title} className="w-full h-[240px] object-cover rounded-t-3xl" />
            </div>
            <div className="absolute w-full bottom-0 p-5 flex flex-col gap-10">
                <div className="flex flex-col items-start gap-2 text-[#1b1b1b]">
                    <p className="text-lg font-bold text-left">{event.title}</p>
                    <div className="flex flex-col items-start gap-1 text-base font-normal">
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/ticket.svg" alt="ticket" />
                            <p>{smallestPrice.toLocaleString()} VND</p>
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <img src="/assets/icons/calendar.svg" alt="calendar" />
                            <p>{recentDate}</p>
                        </div>
                    </div>
                </div>
                <Button bgColor={'#1b1b1b'} textColor={'#fafafa'} title={'Mua vé'} onClick={onClick} />
            </div>
        </div>
    )
}
