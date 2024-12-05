import { cancelOrder, createOrder, getOrders } from "../models/Order";
import { getSession } from "../models/User";

export const fetchOrders = async () => {
    try {
      const { data: { session }, error } = await getSession();
  
      if (error) {
        console.error("Error fetching session:", error);
        return { ordersData: [], sessionStatus: null };
      }
  
      const userEmail = session?.user?.email;
      if (!userEmail) {
        console.warn("No email found in session.");
        return { ordersData: [], sessionStatus: null };
      }
      
      const orders = await getOrders(userEmail);
  
      return { ordersData: orders, sessionStatus: session };
    } catch (error) {
      console.error("Error in fetchUser:", error);
      return { ordersData: null, sessionStatus: null };
    }
}

export const addOrder = async (order) => {
  return await createOrder(order);
};

export const updateStatusOrder = async (order) => {
  return await cancelOrder(order)
}