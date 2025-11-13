import { useEffect, useRef, useState } from 'react';

import arrowDownSVG from '../assets/arrow-down.svg';
import { Link } from 'react-router';

import { useAuthService, type LogoutScope } from '../hooks/useAuthService';
import { CLIENT_ROUTES } from '../routes';

const LogoutButton = ({ type }: { type: LogoutScope }) => {
    const { logOut } = useAuthService();
    return (
        <button
            onClick={() => logOut(type)}
            className="hover:text-red-500 transition-colors"
        >
            {type === 'allDevices' ? 'Log out from all devices' : 'Log out'}
        </button>
    );
};

export const MyProfileDropdown = () => {
    const [expanded, setExpanded] = useState(false);

    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!sectionRef.current?.contains(event.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="relative" ref={sectionRef}>
            <button
                className="flex border-2 border-accent justify-between px-2 py-1 w-fit rounded-small items-center group"
                onClick={() => setExpanded(!expanded)}
            >
                <span>My profile</span>

                <div className="overflow-hidden transition-all duration-300 w-0 group-hover:w-6 flex items-center ">
                    <img
                        src={arrowDownSVG}
                        className={`transition-transform duration-300 ml-1 ${expanded ? 'rotate-180' : 'rotate-0'}`}
                    />
                </div>
            </button>

            {expanded && (
                <menu className="flex flex-col items-center absolute px-6 py-3 right-0 shadow-2xl  whitespace-nowrap rounded-small  bg-primary gap-1 text-base">
                    <Link to={CLIENT_ROUTES.MY_ACCOUNT}>Profile page</Link>
                    <LogoutButton type="thisDevice" />
                    <LogoutButton type="allDevices" />
                </menu>
            )}
        </section>
    );
};
