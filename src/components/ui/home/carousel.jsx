import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Button from "../shared/button";

const initialEvents = [
  {
    city: "Đà Nẵng",
    date: "30.11.2024",
    price: "599.000 VND",
    detailDate: "5 tháng 10, 2024",
    category: "Âm nhạc",
    image: "/assets/images/ntpmm.png",
  },
  {
    city: "Hà Nội",
    date: "01.12.2024",
    price: "799.000 VND",
    detailDate: "10 tháng 10, 2024",
    category: "Âm nhạc",
    image: "/assets/images/ntpmm.png",
  },
  {
    city: "TP.Hồ Chí Minh",
    date: "02.12.2024",
    price: "999.000 VND",
    detailDate: "15 tháng 10, 2024",
    category: "Âm nhạc",
    image: "/assets/images/ntpmm.png",
  },
];

const Carousel = () => {
  const [events, setEvents] = useState(initialEvents);

  // Rotate events forward
  const rotateForward = () => {
    const updatedEvents = [...events];
    const firstEvent = updatedEvents.shift(); // Remove the first item
    updatedEvents.push(firstEvent); // Add it to the end
    setEvents(updatedEvents);
  };

  // Rotate events backward
  const rotateBackward = () => {
    const updatedEvents = [...events];
    const lastEvent = updatedEvents.pop(); // Remove the last item
    updatedEvents.unshift(lastEvent); // Add it to the front
    setEvents(updatedEvents);
  };

  return (
    <div className="w-full bg-[#219ce4] py-16 px-[120px]">
      <Swiper
        navigation
        loop={true} 
        slidesPerView={1.5}
        spaceBetween={0}
        centeredSlides={true}
        modules={[Navigation, EffectCoverflow, Pagination]}
        className="w-full h-full max-w-[1280px] mx-auto flex-shrink-0 relative"
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 30,
          modifier: 50,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        onSlideNextTransitionEnd={rotateForward} 
        onSlidePrevTransitionEnd={rotateBackward} 
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="bg-transparent w-[849px] h-[485px] rounded-2xl overflow-hidden relative">
              <img
                src={event.image}
                alt="event-cover"
                className="object-fill z-0 border-8 rounded-3xl border-[#fcfcfc] border-opacity-60"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(30,27,27,0.30)] to-[rgba(0,0,0,0.30)] rounded-3xl"></div>
              <div className="absolute w-[754px] bottom-0 left-0 mx-12 mb-6 z-20 flex flex-row items-center justify-between text-base text-white font-bold">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex flex-row items-center gap-3">
                    <img src="/assets/icons/ticket.svg" alt="ticket-price" />
                    <span>{event.price} VND</span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <img src="/assets/icons/calendar.svg" alt="calendar" />
                    <span>{event.date}</span>
                  </div>
                </div>
                <Button
                  title={"Xem chi tiết"}
                  textColor={"#fafafa"}
                  bgColor={"#1b1b1b"}
                  icon={"category"}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
