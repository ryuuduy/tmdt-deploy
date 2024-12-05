import AdminSidebar from "../ui/admin/sidebar"
import { useEffect, useState } from "react"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function RoleButton({ role, onClick, isActive }) {
    return (
        <button
            className={`flex px-4 py-2 items-center rounded-[32px] border border-black ${isActive ? 'bg-[#1b1b1b] text-[#fafafa]' : 'bg-[#fafafa] text-[#1b1b1b] hover:bg-[#d9d9d9]'}`}
            onClick={onClick}
        >
            {role}
        </button>
    );
}

export default function ManageUsers() {
    const [activeRole, setActiveRole] = useState('Tất cả');
    const [users, setUsers] = useState([]);
    const [fileredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase.from('users').select('*');
            if (error) {
                console.log('error', error);
                return;
            }
            console.log(data);
            setUsers(data);
            setFilteredUsers(data);
        };
        fetchUsers();
    }, [users.map(user => user.role).join(',')])

    const handleUserStatus = (role) => {
        setActiveRole(role)
        let filtered;
        switch (role) {
            case 'Tất cả':
                filtered = users;
                break;
            case 'Quản trị viên':
                filtered = users.filter(user => user.role === 'admin');
                break;
            case 'Ban tổ chức':
                filtered = users.filter(user => user.role === 'organizer');
                break;
            case 'Khách hàng':
                filtered = users.filter(user => user.role === 'customer');
                break;
            default:
                filtered = users;
                break;
        }
        setFilteredUsers(filtered);
    }

    function UserItem({ user }) {
        const UserBadge = ({ role }) => {
            return (
                <div
                    className={`px-4 py-1 rounded-2xl text-xs font-semibold ${
                        role === 'customer'
                            ? 'bg-[#f2e5cf] border-2 border-[#f2ae39] text-[#f2ae39]'
                            : role === 'organizer'
                            ? 'bg-[#cef6d0] border-2 border-[#56d45c] text-[#56d45c]'
                            : 'bg-[#fbcccc] border-2 border-[#f87474] text-[#f87474]'
                    }`}
                >
                    {role === 'customer'
                        ? 'Khách hàng'
                        : role === 'organizer'
                        ? 'Ban tổ chức'
                        : 'Quản trị viên'}
                </div>
            )
        }

        const handleRoleChange = async (user_id, role) => {
            const { data, error } = await supabase.from('users').update({ role: role }).eq('id', user_id);
            if (error) {
                console.log('error', error);
                return;
            }
            console.log(data);
            const updatedUsers = users.map(user => user.id === user_id ? { ...user, role: role } : user);
            setUsers(updatedUsers);
            handleUserStatus(activeRole);
        }

        const handleRemoveUser = async (user_id) => {
            const { data, error } = await supabase.from('users').delete().eq('id', user_id);
            if (error) {
                console.log('error', error);
                return;
            }
            console.log(data);
            const updatedUsers = users.filter(user => user.id !== user_id);
            setUsers(updatedUsers);
            handleUserStatus(activeRole);
        }
    
        return (
            <div className="w-full flex flex-row items-start justify-between py-5 px-6 rounded-xl border border-black hover:cursor-pointer hover:bg-[#d9d9d9]">
            <div className="flex flex-col items-start gap-1">
                <p className="font-bold text-lg">{user.name}</p>
                <p className="font-normal text-base">Email: {user.email}</p>
                <p className="font-normal text-base">Lần cuối hoạt động: </p>
            </div>
            <div className="flex flex-col items-end gap-4">
                <UserBadge role={user.role} />
                <div className="flex flex-row items-center gap-2">
                {user.role !== 'admin' && (
                    <button className="text-white bg-[#219ce4] px-4 py-2 rounded-lg" onClick={() => handleRoleChange(user.id, "admin")}>Cấp quyền</button>
                )}
                {user.role === 'admin' && (
                    <button className="text-white bg-[#f24b4b] px-4 py-2 rounded-lg" onClick={() => handleRoleChange(user.id, "customer")}>Hủy quyền</button>
                )}
                <button className="text-white bg-[#1b1b1b] px-4 py-2 rounded-lg" onClick={() => handleRemoveUser(user.id)}>Xóa</button>
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-76px)] bg-[#fafafa] w-full flex flex-row gap-5 items-start overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col items-start gap-3 w-full py-7 px-5 text-[#1b1b1b] overflow-hidden">
                <p className="text-2xl font-extrabold">Tất cả người dùng</p>
                <div className="flex flex-row items-center gap-2">
                    {['Tất cả', 'Quản trị viên', 'Ban tổ chức', 'Khách hàng'].map((role, index) => (
                        <RoleButton
                            key={index}
                            role={role}
                            isActive={role === activeRole}
                            onClick={() => handleUserStatus(role)}
                        />
                    ))}
                </div>
                <div className="my-2 flex flex-col items-start gap-2 w-full h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
                    {fileredUsers?.map((user, index) => (
                        <UserItem key={index} user={user} />
                    ))}
                </div>
            </div>
        </div>
    )
}