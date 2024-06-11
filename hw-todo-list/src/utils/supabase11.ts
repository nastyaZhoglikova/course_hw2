import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js'

const supabaseClient = async supabaseAccessToken => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_KEY,
        {
            global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } }
        }
    )
    return supabase
}

type User = {
    id: string;
    email: string;
    custom_api: string;
    bot_type: string;
    discord_id: string;
};

type UserStore = {
    userData: User | null;
    status: 'idle' | 'loading' | 'error';
    error: string | null;
    fetchUser: (userId: string, session: any) => Promise<void>;
    //....
};

export const useUserStore = create<UserStore>((set) => ({
    userData: null,
    status: 'idle',
    error: null,
    fetchUser: async (userId, session) => {
        try {
            set({ status: 'loading' });
            const supabaseAccessToken = await session.getToken({
                template: 'Supabase'
            })
            const supabase = await supabaseClient(supabaseAccessToken)
            const { data, error } = await supabase
                .from('users')
                .select()
                .eq('id', userId)
            console.log(data)
            if (error) {
                console.error(error)
                throw new Error('Error fetching user');
            }
            set({ userData: data![0] ?? null, status: 'idle', error: null });
        } catch (error) {
            set({ status: 'error', error: error.message });
        }
    },
    //....
}));
