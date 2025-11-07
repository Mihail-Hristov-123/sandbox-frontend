import { Link, NavLink } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { clientRoutes } from '../routes';
import logo from '../assets/logo.png';
import { MyProfileDropdown } from './MyProfileDropdown';

const { HOME, LOG_IN, REGISTER } = clientRoutes;

const pathsMap: { name: string; location: keyof typeof clientRoutes }[] = [
    {
        name: 'Home',
        location: 'HOME',
    },
    {
        name: 'Posts',
        location: 'POSTS',
    },
    {
        name: 'Questions',
        location: 'QUESTIONS',
    },
    {
        name: 'Events',
        location: 'EVENTS',
    },
];

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();
    return (
        <header className=" text-xl font-medium  border-b-primary sticky top-0">
            <nav className="bg-primary flex justify-between items-center text-white py-2 px-10 ">
                <Link to={HOME}>
                    <img src={logo} className="w-36" alt="Tackle box logo" />
                </Link>

                <div className="space-x-10">
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
            <nav className="no-underline bg-white shadow-lg flex py-2 justify-center gap-8  ">
                {pathsMap.map(({ name, location }) => (
                    <NavLink to={clientRoutes[location]} key={location}>
                        {name}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
};
