export default function OrganizerInfo({ event }) {
    return (
        <div className="max-w-screen mb-20">
            <div className="flex flex-col items-start gap-7 px-[120px] pt-16 relative mx-auto w-full max-w-[1440px]">
                <div className="flex flex-col gap-5 w-full text-[#1b1b1b]">
                    <span className="text-black text-[32px] leading-10 font-bold text-left">BAN TỔ CHỨC</span>
                    <div className="flex items-start gap-6 px-10 py-7 border border-black rounded-3xl">
                        {/* Logo */}
                        <div className="w-20 h-20 flex-shrink-0">
                            <img
                                src={event?.organizer.logo}
                                alt={'logo'}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        {/* Organizer Details */}
                        <div>
                            <div className="text-xl font-semibold">{event?.organizer.name}</div>
                            <div className="text-sm mt-1">{event?.organizer.info}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
