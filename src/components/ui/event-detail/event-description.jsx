import React, { useState } from 'react';

export default function EventDescription({ event }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="max-w-screen">
      <div className="flex flex-col items-start gap-7 px-[120px] pt-16 relative mx-auto w-full max-w-[1440px]">
        <span className="text-black text-[32px] leading-10 font-bold text-left">
          GIỚI THIỆU SỰ KIỆN
        </span>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center gap-7">
            <div
              className={`p-10 w-full border-black border rounded-3xl overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-[380px]'}`}
            >
              <div className="max-w-[1200px] text-black text-lg font-normal text-left">
                {event?.description}
              </div>
            </div>
            <button
              className="border border-black rounded-[32px] px-8 py-2 flex flex-row gap-2 items-center cursor-pointer"
              onClick={toggleExpand}
            >
              <span className="text-black font-normal text-lg">Xem thêm</span>
              <img src="/assets/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} className={`${isExpanded ? 'rotate-180' : ''} transition-all ease-in-out duration-150`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
