import { useEffect, useState } from 'react';
import { useLoadingContext } from '../contexts/loading/useLoadingContext';
import poleSVG from '../assets/pole.svg';

export const LoadingScreen = () => {
    const { isLoading } = useLoadingContext();
    const [loadingScreenShown, setLoadingScreenShown] = useState(isLoading);

    useEffect(() => {
        let timeoutId: number;

        if (isLoading) {
            setLoadingScreenShown(true);
            document.body.style.overflow = 'hidden';
        } else {
            timeoutId = setTimeout(() => {
                setLoadingScreenShown(false);
                document.body.style.overflow = '';
            }, 500);
        }

        return () => {
            clearTimeout(timeoutId);
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    if (!loadingScreenShown) return null;

    return (
        <section className="w-screen h-screen fixed top-0 z-50 flex flex-col items-center justify-center backdrop-blur-md ">
            <img
                src={poleSVG}
                alt="Fishing pole"
                className=" animate-pulse w-40"
            />
            <p className="text-primary text-lg font-medium ">
                Loading, please wait...
            </p>
        </section>
    );
};
