import { createContext } from 'react';
import type { UserReturnValues } from '@/schemas/auth/RegisterSchema';

interface AuthValues {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: UserReturnValues | undefined;
    updateAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthValues>({
    isLoggedIn: false,
    setIsLoggedIn: () => undefined,
    userInfo: undefined,
    updateAuth: async () => undefined,
});
