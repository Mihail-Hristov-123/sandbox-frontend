import { useState } from 'react';
import { LoadingContext } from './LoadingContext';

export const LoadingContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setIsLoading, isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
