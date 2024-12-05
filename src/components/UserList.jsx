import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Logout } from './Logout';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState(null); // Track if the user is logged in

  // Fetch the session state and listen for auth state changes
  useEffect(() => {
    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the user list when the component loads
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Simulate fetching users from an API or database
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>

      {/* Display the list of users */}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* Only show the Logout button if the user is logged in */}
      {session && <Logout />}
    </div>
  );
};

export default UserList;