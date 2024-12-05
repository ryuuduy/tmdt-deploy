// src/models/Order.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getOrders = async (email) => {
    const { data, error } = await supabase.from("ordered").select().eq("user_email", email)
    if (error) {
      console.error("Error fetching Orders:", error)
      return null
    }
    return data
}

export const createOrder = async (order) => {
  const { data, error } = await supabase.from("ordered").insert([order]);
  if (error) throw error;
  return data;
};

export const cancelOrder = async (order) => {
  const { data, error } = await supabase.from("ordered").update({ isCancelled: true }).eq('id', order.id).single()
  if (error) throw error
  return data
}