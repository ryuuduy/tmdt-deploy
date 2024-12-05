export default function Section({ title, children }) {
    return (
        <div className="max-w-screen">
            <div className="flex flex-col items-start gap-7 px-[120px] pt-16 relative mx-auto w-full max-w-[1440px]">
                <span className="text-black text-[32px] leading-10 font-bold text-left">
                    {title}
                </span>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}