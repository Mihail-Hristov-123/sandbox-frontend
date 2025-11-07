import { createContext } from 'react';

type LoadingContextValues = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextValues>({
    isLoading: false,
    setIsLoading: () => undefined,
});
