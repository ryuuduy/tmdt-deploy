import Footer from './ui/shared/footer';
import Section from './ui/home/section';
import Carousel from './ui/home/carousel';

const RECENT_CATEGORY = ['Tất cả', 'Âm nhạc', 'Thể thao', 'Seminar', 'Khác'];
const EVENT_CATEGORY = ['Tất cả', 'Âm nhạc', 'Thể thao', 'Seminar', 'Khác'];

export default function Home() {
    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full">
            {/* <Header /> */}
            <div className='relative z-0'>
                <div className='h-full w-full'>
                    <main className="flex-grow items-center justify-center flex flex-col w-full overflow-x-hidden">
                        <Carousel />
                        <Section title='SỰ KIỆN NỔI BẬT' categoryItems={RECENT_CATEGORY} maxCards={3} />
                        <Section title='SỰ KIỆN' categoryItems={EVENT_CATEGORY} maxCards={6} />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
