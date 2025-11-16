import { Link, NavLink } from 'react-router';

import logo from '@/assets/logo.png';
import { CLIENT_ROUTES, type ClientRoute } from '@/routes';
import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { MyProfileDropdown } from '../MyProfileDropdown';

const { HOME, LOG_IN, REGISTER } = CLIENT_ROUTES;

const pathsMap: { name: string; location: ClientRoute }[] = [
    { name: 'Home', location: 'HOME' },
    { name: 'Posts', location: 'POSTS' },
    { name: 'Questions', location: 'QUESTIONS' },
    { name: 'Events', location: 'EVENTS' },
];

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();
    return (
        <header className=" text-xl font-medium  border-b-primary sticky top-0 z-50">
            <nav className="bg-primary flex justify-between items-center text-white py-2 px-10 ">
                <Link to={HOME}>
                    <img src={logo} className="w-36" alt="Tackle box logo" />
                </Link>

                <div className="space-x-10 max-sm:space-x-6">
                    {isLoggedIn ? (
                        <MyProfileDropdown />
                    ) : (
                        <>
                            <Link to={LOG_IN}>Log in</Link>
                            <Link to={REGISTER}>Register</Link>
                        </>
                    )}
                </div>
            </nav>
            <nav className="no-underline bg-white shadow-lg flex py-2 justify-center flex-wrap gap-8  ">
                {pathsMap.map(({ name, location }) => (
                    <NavLink to={CLIENT_ROUTES[location]} key={location}>
                        {name}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
};
