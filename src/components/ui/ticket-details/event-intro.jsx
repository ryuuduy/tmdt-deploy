import React, { useState } from 'react';

export default function EventIntro({id}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-7">
            <div
                className={`p-10 w-full border-black border rounded-3xl overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-[380px]'}`}
            >
                <div className="max-w-[1200px] text-black text-lg font-normal text-left">
                    YÊU HOÀ BÌNH 2024 - MANIFEST NHỮNG GIẤC MƠ ĐỜI MÌNH<br /><br />
                    Hoà bình chỉ đến khi mình thực sự thấy tự do, tự do chọn công việc mình thích, tự do chọn người mình yêu, tự do đau khổ, tự do vẫy vùng, và tự do theo đuổi giấc mơ đời mình.<br />
                    YÊU HÒA BÌNH 2024 chọn manifest những giấc mơ chưa thành hình, biến sân khấu âm nhạc ngoài trời thành bữa tiệc của những kẻ mộng mơ. Mặc kệ cho xáo động ngoài kia, hi vọng tất cả chúng ta đều có thể can đảm theo đuổi đam mê, yêu sự lựa chọn của mình và biến mọi ước mơ thành hiện thực.<br />
                    Lưu ý khi mua vé: <br />
                    - Mỗi lần giao dịch chỉ được mua tối đa 05 vé.<br />
                    - Phụ nữ mang thai hay người có vấn đề đề sức khỏe tự cân nhắc khi tham gia chương trình.<br />
                    - Khi tham gia chương trình, người tham gia đồng ý hình ảnh của mình được sử dụng để khai thác cho sản phẩm ghi hình, thu âm, quảng bá cho chương trình.<br /> 
                    - Không xâm phạm khu vực hạn chế, mà không có sự cho phép của BTC.<br />
                    - Không mang đồ ăn, thức uống vào khu vực sự kiện.<br />
                    - BTC có quyền từ chối sự tham gia của bất kì khán giả nào không tuân theo quy định của chương trình và không hoàn trả lại vé.<br />
                    - Không mang đồ cháy nổ, pháo sáng, laser, vũ khí, vật sắc nhọn các loại.<br />
                    - Không tàng trữ và sử dụng ma túy, thuốc lá, chất kích thích và các loại chất cấm khác.<br />
                    - Không mang thiết bị flycam, drone vào khu vực diễn ra sự kiện.<br />
                    - Không mang theo vật nuôi khi tham gia sự kiện.<br />
                    - Event dành cho đối tượng trên 15 tuổi trở lên. Không hỗ trợ xuất hóa đơn VAT.<br />
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
    );
}
