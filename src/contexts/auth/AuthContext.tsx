import { createContext } from 'react';

interface AuthValues {
    isLoggedIn: boolean;
    refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthValues>({
    isLoggedIn: false,
    refresh: async () => undefined,
});
