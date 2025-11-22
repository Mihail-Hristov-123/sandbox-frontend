import type { User } from '@/types';
import { createContext } from 'react';

interface AuthValues {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: User | undefined;
    updateAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthValues>({
    isLoggedIn: false,
    setIsLoggedIn: () => undefined,
    userInfo: undefined,
    updateAuth: async () => undefined,
});
