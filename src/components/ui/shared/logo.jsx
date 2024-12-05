import { useNavigate } from "react-router-dom"

export default function Logo({image, title, textColor}) {
    const navigate = useNavigate()
    return (
        <div 
            className="flex items-center px-3 py-[10px] gap-[10px] justify-center hover:cursor-pointer"
            onClick={() => navigate('/')}
        >
            <img src={`/assets/icons/${image}.svg`} alt="logo" />
            <p className={`text-[${textColor}] text-[20px] leading-7 font-bold`}>{title}</p>
        </div>
    )
}