// src/controllers/userController.js
import { getAllUsers, createUser, getUser, getSession, updateUser } from "../models/User";

export const fetchAllUsers = async () => {
  return await getAllUsers();
};

export const addUser = async (user) => {
  return await createUser(user);
};

export const fetchUser = async () => {
  try {
    const { data: { session }, error } = await getSession();

    if (error) {
      console.error("Error fetching session:", error);
      return { userData: null, sessionStatus: null };
    }

    const userEmail = session?.user?.email;
    if (!userEmail) {
      console.warn("No email found in session.");
      return { userData: null, sessionStatus: null };
    }
    
    const user = await getUser(userEmail);

    if (!user) {
        console.warn("No user found with the provided email.");
        return { userData: null, sessionStatus: session };
    }

    return { userData: user, sessionStatus: session };
  } catch (error) {
    console.error("Error in fetchUser:", error);
    return { userData: null, sessionStatus: null };
  }
}

export const changeInfo = async (user) => {
  return await updateUser(user)
}
