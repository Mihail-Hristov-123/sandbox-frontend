import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
} from 'react';

interface AuthValues {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValues | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'Auth provider is necessary for auth context to be used',
        );
    }

    return authContext;
};
