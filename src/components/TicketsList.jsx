import Footer from './ui/shared/footer';
import { useEffect, useState } from 'react';
import Order from './ui/tickets-list/order';
import { fetchOrders } from '../controllers/orderController';

export default function TicketsList() {
    const [orders, setOrders] = useState([])
    const [session, setSession] = useState(false)
    useEffect(() => {
        const fetchOrdersData = async () => {
            const { ordersData, sessionStatus } = await fetchOrders()
            if(sessionStatus) {
                if(ordersData) {
                    setOrders(ordersData);
                }
                setSession(true)
            }
        }
        fetchOrdersData()
    }, [])
    if(!session) {
        return <div className="text-black">User not found</div>
    }
    if(orders.length == 0 ) {
        return <div className='text-black'>Chưa có hóa đơn nào</div>
    }
    return (
        <div className="relative min-h-[100dvh] bg-[#fafafa] w-full text-[#1b1b1b] font-sans text-start">
            <div className="h-full w-full">
                <main className="flex flex-col w-full overflow-x-hidden px-24 py-8 gap-8">
                    <p className="text-3xl text-[#1b1b1b] font-extrabold text-center">Danh sách vé</p>
                    {orders.map((order, index) => (
                        <Order key={index} order={order} />
                    ))}
                </main>
                <Footer />
            </div>
        </div>
    );
}
