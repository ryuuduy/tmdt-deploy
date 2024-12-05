import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';

import Button from "./button";
import Logo from "./logo";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const NAV_ITEMS = [
    {
        title: "Trang chủ",
        icon: "home",
        link: "/",
    },
    {
        title: "Vé đã mua",
        icon: "ticket",
        link: "/my-tickets",
    },
    {
        title: "Sự kiện của tôi",
        icon: "calendar",
        link: "/my-events",
    }
]

const NavItem = ({ title, icon, link, isActive }) => {
    return (
        <div className="flex py-2 pl-3 pr-[14px] items-center justify-center gap-[6px] hover:cursor-pointer">
            <img src={`/assets/icons/${icon}.svg`} alt={icon} width={14} height={14} />
            <Link to={link}>
                <a className={`${isActive ? 'text-[#219ce4]' : 'text-[#1b1b1b]'} text-base font-semibold`}>{title}</a>
            </Link>
        </div>
    );
};

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [session, setSession] = useState(null);

    const handleNavigate = (nav) => () => {
        window.scrollTo(0, 0);
        navigate(`/${nav}`)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    useEffect(() => {
        const loadSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (session) {
                const userEmail = session.user.email;

                if (userEmail) {
                    const { data: userData, error } = await supabase
                        .from('users')
                        .select('role')
                        .eq('email', userEmail)
                        .single();

                    if (error) {
                        console.error("Error fetching user data:", error);
                        return;
                    }

                    if (userData && userData.role === 'admin') {
                        if (!location.pathname.startsWith('/admin')) {
                            navigate('/admin', { replace: true });
                        }
                    }
                    else {
                        if (location.pathname.startsWith('/admin')) {
                            navigate('/', { replace: true });
                        }
                    }
                }
            }
        };

        loadSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate, location.pathname]);

    // if on login page, render a different header
    if (location.pathname === '/login') {
        return (
            <div className="max-w-screen sticky top-0 z-50 bg-[#fafafa] shadow-[0_1px_2px_0px_rgba(0,0,0,0.1)]">
                <div className="relative mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between px-12 py-3">
                    <div className="flex items-center gap-6">
                        <Logo title="s-ticket" image={'logo'} textColor={'#1b1b1b'} />
                        <span className="text-2xl font-bold text-[#1b1b1b]">Đăng nhập</span>
                    </div>
                    <Link to="/">
                        <a className="text-base font-semibold text-[#1b1b1b] underline">Bạn cần hỗ trợ?</a>
                    </Link>
                </div>
            </div>
        );
    }

    // if on admin page, render a different header
    if (location.pathname.startsWith('/admin')) {
        return (
            <div className="max-w-screen sticky w-full top-0 z-50 bg-[#fafafa] shadow-[0_1px_2px_0px_rgba(0,0,0,0.1)]">
                <div className="relative mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between px-12 py-3">
                    <div className="flex items-center gap-6">
                        <Logo title="s-ticket" image={'logo'} textColor={'#1b1b1b'} />
                        <span className="text-2xl font-bold text-[#1b1b1b]">Quản trị viên</span>
                    </div>
                    <Link to="/">
                        <a className="text-base font-semibold text-[#1b1b1b] underline">Bạn cần hỗ trợ?</a>
                    </Link>
                </div>
            </div>
        );
    }

    // default header for authenticated users and guests
    return (
        <div className="max-w-screen sticky top-0 z-50 bg-[#fafafa] shadow-[0_1px_2px_0px_rgba(0,0,0,0.1)]">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between px-12 py-3">
                <div className="flex items-center gap-6">
                    <Logo title="s-ticket" image={'logo'} textColor={'#1b1b1b'} />
                    <div className="flex items-center gap-3">
                        {NAV_ITEMS.map((item, index) => (
                            <NavItem key={index} title={item.title} icon={item.icon} link={item.link} isActive={item.link === window.location.pathname} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <Button title={'Tạo sự kiện'} bgColor={'#219ce4'} textColor={'#fafafa'} icon={'add-circle'} isActive onClick={handleNavigate('add-event')} />
                    <div className="flex flex-row items-center gap-6">
                        {session ? (
                            <>
                                <div className="text-[#1b1b1b]">{session.user.email}</div>
                                <Button title={'Đăng xuất'} bgColor={'#fafafa'} textColor={'#1b1b1b'} onClick={handleLogout} />
                            </>
                        ) : (
                            <>
                                <Button title={'Đăng nhập'} bgColor={'#fafafa'} textColor={'#1b1b1b'} onClick={handleNavigate('login')} />
                                <div className="bg-black w-[1px] h-4"></div>
                                <Button title={'Đăng ký'} bgColor={'#fafafa'} textColor={'#1b1b1b'} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
