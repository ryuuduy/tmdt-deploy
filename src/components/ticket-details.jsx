import Footer from './ui/shared/footer';
import Section from './ui/ticket-details/section';
import TicketFrame from './ui/ticket-details/ticket-frame';
import EventIntro from './ui/ticket-details/event-intro';
import TicketInfo from './ui/ticket-details/ticket-info';
import OrganizerInfo from './ui/ticket-details/organizer-info';
import { useParams } from 'react-router-dom';

export default function TicketDetails() {
    const event_id = useParams().id

    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full">
            <div className='relative z-0'>
                <div className="h-full w-full">
                    <main className="flex-grow items-center justify-center flex flex-col w-full overflow-x-hidden">
                        <TicketFrame id={event_id} />
                        <Section title="GIỚI THIỆU SỰ KIỆN"><EventIntro id={event_id} /></Section>
                        <Section title="THÔNG TIN VÉ"><TicketInfo id={event_id} /></Section>
                        <Section title="BAN TỔ CHỨC"><OrganizerInfo id={event_id} /></Section>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}