import { NavLink } from 'react-router';

import { clientRoutes } from '../routes';
import { useAuthContext } from '../contexts/auth/useAuthContext';

const { HOME, POSTS, MY_ACCOUNT, PROTECTED, LOG_IN, REGISTER } = clientRoutes;

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();

    return (
        <nav className=" bg-gray-700 w-full px-24 py-2 text-white font-bold flex justify-between">
            <div className="flex gap-20">
                <NavLink to={HOME}>Home</NavLink>
                <NavLink to={POSTS}>Posts</NavLink>
                {isLoggedIn && (
                    <NavLink to={PROTECTED}>Protected route</NavLink>
                )}
            </div>

            <div className=" flex gap-8 self-end ">
                {isLoggedIn ? (
                    <NavLink to={MY_ACCOUNT}>My account</NavLink>
                ) : (
                    <>
                        <NavLink to={LOG_IN}>Log in</NavLink>
                        <NavLink to={REGISTER}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};
