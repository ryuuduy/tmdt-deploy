import { Link } from 'react-router-dom';
import Logo from './logo';

const INFO_ITEMS = [
    {
        id: 1,
        item: 'Tòa A3, 268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh'
    },
    {
        id: 2,
        item: 'Hotline: 123456789'
    },
    {
        id: 3,
        item: 'Email: contact@sticket.com.vn'
    },
    {
        id: 4,
        item: 'Nguời chịu trách nhiệm quản lý website: Nguyễn Thái Sơn'
    }
]

const ABOUT_US_ITEMS = [
    {
        id: 1,
        item: 'Quy chế hoạt động',
        link: '/'
    },
    {
        id: 2,
        item: 'Chính sách bảo mật',
        link: '/'
    },
    {
        id: 3,
        item: 'Cơ chế giải quyết tranh chấp/ khiếu nại',
        link: '/'
    },
    {
        id: 4,
        item: 'Chính sách bảo mật thanh toán',
        link: '/'
    }, 
    {
        id: 5,
        item: 'Chính sách đổi trả và kiểm hàng',
        link: '/'
    },
    {
        id: 6,
        item: 'Điều kiện vận chuyển và giao nhận',
        link: '/'
    }, 
    {
        id: 7,
        item: 'Phương thức thanh toán',
        link: '/'
    }
]

export default function Footer() {
    return(
        <div className="max-w-screen bottom-0 z-10 bg-[#1b1b1b] !text-[#fafafa]">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-row items-start px-[108px] pt-20 pb-[200px] justify-between" >
                <div className="flex flex-col items-start gap-4">
                    <div className="flex flex-col items-start gap-2 -translate-x-3">
                        <Logo image="logo" title="s-ticket" textColor={'#fafafa'} />
                        <p className='text-xl font-bold max-w-[374px]'>
                            HỆ THỐNG QUẢN LÝ VÀ PHÂN PHỐI VÉ DÀNH CHO HỌC SINH, SINH VIÊN
                        </p>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        {INFO_ITEMS.map((item) => (
                            <p key={item.id} className='text-sm font-normal'>{item.item}</p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4 items-start'>
                    <p className='text-xl font-bold'>VỀ CHÚNG TÔI</p>
                    {ABOUT_US_ITEMS.map((item) => (
                        <Link key={item.id} to={item.link}>
                            <p className='text-sm font-normal'>{item.item}</p>
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-4 items-start'>
                        <p className='text-xl font-bold'>DÀNH CHO KHÁCH HÀNG</p>
                        <Link to='/'>
                            <p className='text-sm font-normal'>Điều khoản sử dụng cho khách hàng</p>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-4 items-start'>
                        <p className='text-xl font-bold'>DÀNH CHO BAN TỔ CHỨC</p>
                        <Link to='/'>
                            <p className='text-sm font-normal'>Điều khoản sử dụng cho ban tổ chức</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}