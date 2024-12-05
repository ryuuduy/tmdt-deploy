import EVENTS from '../../../mock_data/event.json'

export default function OrganizerInfo({ id }) {
    const event = EVENTS.find((event) => event.id === parseInt(id));

    return (
        <div className="min-w-[1200px] w-full mb-14 py-7 px-10 border border-black rounded-2xl text-[#1b1b1b] flex flex-row gap-8">
            <div className="rounded-full w-[120px] h-[120px] bg-[#d9d9d9]"></div>
            <div className="flex flex-col items-start gap-[6px]">
                <span className="text-2xl font-semibold">{event.organizer.name}</span>
                <span className="text-lg font-normal">{event.organizer.description}</span>
            </div>
        </div>
    )
}
