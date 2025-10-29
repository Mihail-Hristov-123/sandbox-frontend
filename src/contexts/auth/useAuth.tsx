import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'Auth provider is necessary for auth context to be used',
        );
    }

    return authContext;
};
