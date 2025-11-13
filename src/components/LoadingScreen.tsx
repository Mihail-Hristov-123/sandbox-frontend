import { useLoadingContext } from '../contexts/loading/useLoadingContext';
import poleSVG from '../assets/pole.svg';
import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
    const { isLoading } = useLoadingContext();
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);

    useEffect(() => {
        let timeoutId: number;
        if (isLoading) {
            setShowLoadingScreen(true);
        } else {
            timeoutId = setTimeout(() => {
                setShowLoadingScreen(false);
            }, 500);
        }

        return () => clearTimeout(timeoutId);
    }, [isLoading]);

    document.body.style.overflow = showLoadingScreen ? 'hidden' : '';

    if (!showLoadingScreen) return null;

    return (
        <section className="w-screen h-screen fixed top-0 z-40 flex flex-col items-center justify-center backdrop-blur-3xl  ">
            <img
                src={poleSVG}
                alt="Fishing pole"
                className=" animate-pulse w-40"
            />
            <p className="text-primary text-lg  font-medium ">
                Loading, please wait...
            </p>
        </section>
    );
};
