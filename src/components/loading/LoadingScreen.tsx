import { LoadingSVG } from './LoadingSVG';

export const LoadingScreen = () => (
    <main className="flex flex-col items-center justify-center min-h-screen animate-pulse  bg-white space-y-8">
        <LoadingSVG />
        <p className="text-gray-600 text-lg font-medium">
            Loading, please wait...
        </p>
    </main>
);
