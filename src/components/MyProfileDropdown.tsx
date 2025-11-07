import { useEffect, useRef, useState } from 'react';
import picklistSVG from '../assets/picklist.svg';
import crossSVG from '../assets/cross.svg';
import { Link } from 'react-router';
import { clientRoutes } from '../routes';
import { useAuthService, type LogoutScope } from '../hooks/useAuthService';

const LogoutButton = ({
    label,
    type,
}: {
    label: string;
    type: LogoutScope;
}) => {
    const { logOut } = useAuthService();
    return (
        <button
            onClick={() => logOut(type)}
            className="hover:text-red-500 transition-colors"
        >
            {label}
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
                className="flex border-2 border-accent justify-between px-1 py-1 rounded-small items-center group"
                onClick={() => setExpanded(!expanded)}
            >
                <span className="px-2">My profile</span>

                <img
                    src={expanded ? crossSVG : picklistSVG}
                    className="w-0 border-l-2 opacity-0 border-l-accent  transition-all duration-200  group-hover:w-7 group-hover:opacity-100"
                    alt="Dropdown menu icon"
                />
            </button>
            {expanded && (
                <menu className="flex flex-col items-center absolute px-6 py-3  right-0 shadow-xl  whitespace-nowrap rounded-small  bg-primary gap-1 text-base">
                    <Link to={clientRoutes.MY_ACCOUNT}>Profile page</Link>

                    <LogoutButton label="Log out" type="thisDevice" />
                    <LogoutButton
                        label="Log out from all devices"
                        type="allDevices"
                    />
                </menu>
            )}
        </section>
    );
};
