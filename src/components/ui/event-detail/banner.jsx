import Button from '../shared/button'

export default function Banner({ event }) {
  function getEventDetails(show) {
    if (!show || !show.ticket_types) return {};

    const minPrice = show.ticket_types.reduce(
      (min, ticket) => Math.min(min, ticket.price),
      Infinity
    );

    return {
      price: minPrice.toLocaleString(),
      startDate: show.start_date,
      startTime: show.start_time,
    };
  }
  const eventDetails = getEventDetails(event?.shows[0]);
  return (
    <div className="relative flex w-full h-full justify-center items-center flex-shrink-0 bg-[#219ce4] py-20">
      <div className="relative flex w-full h-full overflow-hidden mx-auto max-w-[1440px] left-10">
        <img src="/assets/ticket-frame.svg" alt="ticket-frame" className="z-0 drop-shadow-sm" />
        <img
          src={event?.image}
          alt="event-banner"
          className="z-10 absolute w-[848px] h-[478px] object-cover mask"
          style={{
            maskImage: 'url("/assets/ticket-frame.svg")',
            maskSize: 'cover',
          }}
        />
        <div className="z-10 absolute flex flex-col right-24 top-8 w-[425px] h-[416px] text-left">
          <span className="text-black text-2xl font-bold mb-5">
            {event?.title}
          </span>
          <div className="flex flex-col flex-grow items-start gap-2">
            <div className="flex flex-row items-center gap-3">
              <img src="/assets/icons/profile-2user.svg" alt="organizer" width={20} height={20} />
              <span className="text-black text-sm font-normal">
                {event?.organizer.name}
              </span>
            </div>
            <div className="flex flex-row items-center gap-3">
              <img src="/assets/icons/ticket.svg" alt="time" width={20} height={20} />
              <span className="text-black text-sm font-normal">
                {eventDetails.startTime}, {eventDetails.startDate}
              </span>
            </div>
            <div className="flex flex-row items-start gap-3">
              <img src="/assets/icons/calendar.svg" alt="location" width={20} height={20} />
              <div className="flex flex-col items-start text-black text-sm font-normal">
                <span>{event?.location.name}</span>
                <span>{event?.location.address}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-end justify-between mb-5">
            <p className="text-black text-[16px] leading-[12px] font-bold">Giá vé từ</p>
            <p className="text-[#219ce4] text-[32px] leading-[22px] font-bold">{eventDetails.price} VND</p>
          </div>
          <Button
            title="Mua vé ngay"
            bgColor="#1b1b1b"
            textColor="#fff"
            onClick={() => {
              const section = document.getElementById('event-list');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
