import { NavLink } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { clientRoutes } from '../routes';
import burgerMenuSVG from '../assets/burger.svg';
import profilePic from '../assets/user.png';
import { useAuthService } from '../hooks/useAuthService';
import type { ReactNode } from 'react';

const { HOME, POSTS, MY_ACCOUNT, QUESTIONS, LOG_IN, REGISTER } = clientRoutes;

interface DropdownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

const DropdownMenu = ({
    trigger,
    children,
    className = '',
}: DropdownMenuProps) => (
    <div className="relative group cursor-pointer">
        {trigger}
        <menu
            className={`absolute flex-col items-center gap-2 top-full bg-primary hidden group-hover:flex whitespace-nowrap ${className}`}
        >
            <div className="w-48 [&>a,&>button]:hover:bg-secondary [&>a,&>button]:px-4 flex flex-col items-center gap-2 ">
                {children}
            </div>
        </menu>
    </div>
);

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();
    const { logOut } = useAuthService();

    return (
        <nav className="bg-primary w-full px-8 py-4 text-white font-bold flex justify-between items-center">
            <DropdownMenu
                trigger={
                    <img
                        src={burgerMenuSVG}
                        className="w-12"
                        alt="Dropdown menu icon"
                    />
                }
            >
                <NavLink className="px-8 py-4 w-full" to={POSTS}>
                    Posts
                </NavLink>
                <NavLink className="px-8 py-4 w-full" to={QUESTIONS}>
                    Questions
                </NavLink>
            </DropdownMenu>

            <NavLink to={HOME}>The Tackle Box</NavLink>

            <DropdownMenu
                trigger={
                    <img
                        src={profilePic}
                        className="w-12"
                        alt="User profile pic"
                    />
                }
                className="right-0"
            >
                {isLoggedIn ? (
                    <>
                        <NavLink to={MY_ACCOUNT}>My account</NavLink>
                        <button onClick={() => logOut('thisDevice')}>
                            Log out
                        </button>
                        <button onClick={() => logOut('allDevices')}>
                            Log out from all devices
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to={LOG_IN}>Log in</NavLink>
                        <NavLink to={REGISTER}>Register</NavLink>
                    </>
                )}
            </DropdownMenu>
        </nav>
    );
};
