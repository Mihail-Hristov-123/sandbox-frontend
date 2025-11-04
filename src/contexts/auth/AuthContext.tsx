import { createContext, type SetStateAction } from 'react';

interface AuthValues {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValues>({
    isLoggedIn: false,
    setIsLoggedIn: () => undefined,
});
