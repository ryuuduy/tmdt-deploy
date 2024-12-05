import { useState } from "react";

export default function Button({ title, bgColor, textColor, icon, isActive, onClick, style }) {
    return (
        <div 
            className={`flex py-[10px] pl-[14px] pr-3 items-center justify-center gap-[6px] rounded-lg hover:cursor-pointer ${
                isActive ? 'bg-[#b2bcc2]' : ''
            } ${style ? style : ''}`} 
            style={{ backgroundColor: bgColor, color: textColor }}
            onClick={onClick}
        >
            {icon ? <img src={`/assets/icons/${icon}.svg`} alt={icon} width={14} height={14} /> : null}
            <span className={`text-base font-semibold ${icon || bgColor=='#219CE4' ? '' : 'hover:text-[#219ce4]'}`}>{title}</span>
        </div>
    )
}

export function Dropdown({ title, bgColor, textColor, icon, isActive, children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`relative flex py-[10px] pl-[14px] pr-3 items-center gap-1 rounded-lg ${isActive ? 'bg-[#b2bcc2]' : ''}`} style={{ backgroundColor: bgColor, color: textColor }}>
            {/* <Image src={`/icons/${icon}.svg`} alt={icon} width={20} height={20} /> */}
            <span className="text-base font-semibold">{title}</span>
            <div className={`absolute top-[40px] right-0 w-[200px] bg-[#fafafa] shadow-[0_1px_2px_0px_rgba(0,0,0,0.1)] ${isOpen ? '' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}