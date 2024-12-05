// src/models/User.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
};

export const createUser = async (user) => {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) throw error;
  return data;
};

export const getUser = async (email) => {
  const { data, error } = await supabase.from("users").select().eq("email", email).single()
  if (error) {
    console.error("Error fetching user:", error)
    return null
  }
  return data
}

export const getSession = () => {
  return supabase.auth.getSession()
}

export const updateUser = async (user) => {
  const { data, error } = await supabase.from("users").update(user).eq('id', user.id).single()
  if (error) throw error
  return data
}