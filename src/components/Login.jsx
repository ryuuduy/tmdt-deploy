import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Footer from './ui/shared/footer'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                navigate('/admin', { replace: true });
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <div className="relative min-h-[100dvh] bg-[#fafafa] w-full">
                <div className='relative z-0'>
                    <div className='h-full w-full'>
                        <main className='flex-grow items-center justify-center flex flex-col w-full overflow-x-hidden py-20 bg-[#219ce4]'>
                            <div className='bg-[#fafafa] px-24 py-16 rounded-2xl shadow-[0_1px_10px_2px_rgba(0,0,0,0.1)] flex flex-col items-center gap-5'>
                                <span className='text-[#1b1b1b] text-3xl font-bold'>Đăng nhập</span>
                                <Auth
                                    supabaseClient={supabase}
                                    appearance={{ theme: ThemeSupa }}
                                    providers={['google']}
                                />
                            </div>
                        </main>
                        <Footer />
                    </div>                
                </div>
            </div>
        );
    }
    else {
        return (<div>Logged in!</div>)
    }
}