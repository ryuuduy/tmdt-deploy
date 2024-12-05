import { useState, useEffect } from 'react';
import EventCard from './event-card';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function CategoryButton({ category, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b]'}`}
            onClick={onClick}
        >
            {category}
        </button>
    );
}

function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export default function Section({ title, categoryItems, maxCards }) {
    const navigate = useNavigate()

    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [events, setEvents] = useState([]);

    // fetch events from database with category filtering
    useEffect(() => {
        const fetchEvents = async () => {
            const categoryFilter = activeCategory === 'Tất cả' ? {} : { category: activeCategory }; 
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .match(categoryFilter);

            if (error) {
                console.error('Error fetching events:', error.message);
            } else {
                setEvents(data);
            }
        };
        fetchEvents();
    }, [activeCategory]); 

    useEffect(() => {
        if (categoryItems.length > 0) {
            setActiveCategory(categoryItems[0]);
        }
    }, [categoryItems]);

    const eventsToDisplay = events.slice(0, maxCards); 
    const chunkedEvents = chunkArray(eventsToDisplay, 3); 

    return (
        <div className='max-w-screen'>
            <div className="flex flex-col items-start gap-12 px-[120px] py-16 relative mx-auto w-full min-w-[1440px] max-w-[1440px]">
                <div className="flex flex-col items-start gap-2">
                    <p className="text-5xl leading-[64px] text-[#1b1b1b] font-extrabold">{title}</p>
                    <div className="flex flex-row items-center gap-2">
                        {categoryItems.map((category, index) => (
                            <CategoryButton
                                key={index}
                                category={category}
                                isActive={category === activeCategory}
                                onClick={() => setActiveCategory(category)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {chunkedEvents.length === 0 && <p className='text-black w-full text-center'>Không có sự kiện nào.</p>}
                    {chunkedEvents.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-row items-stretch gap-8">
                            {row.map((item) => (
                                <div key={item.id} className="flex-1">
                                    <EventCard
                                        event={item}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            navigate(`/ticket-details/${item.id}`)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}