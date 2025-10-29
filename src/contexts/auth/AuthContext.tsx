import { createContext, type Dispatch, type SetStateAction } from 'react';

interface AuthValues {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValues | undefined>(undefined);
