import { useState, useRef } from 'react';

export const useDelayedLoading = () => {
    const [isLoading, setIsLoading] = useState(true);
    const timeoutRef = useRef<number>(0);

    const setLoading = (value: boolean) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (value) {
            setIsLoading(true);
        } else {
            timeoutRef.current = setTimeout(() => setIsLoading(false), 500);
        }
    };

    const loading = isLoading;

    return { loading, setLoading };
};
