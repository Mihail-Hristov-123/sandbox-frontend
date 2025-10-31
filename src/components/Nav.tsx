import { NavLink } from 'react-router';

import { Routes } from '../Routes';
import { useAuth } from '../contexts/auth/useAuth';

export const Nav = () => {
    const { isLoggedIn } = useAuth();

    return (
        <nav className=" bg-gray-700 w-full px-24 py-2 text-white font-bold flex justify-between">
            <div className="flex gap-20">
                <NavLink to={Routes.HOME}>Home</NavLink>
                <NavLink to={Routes.POSTS}>Posts</NavLink>
                {isLoggedIn && (
                    <NavLink to={Routes.PROTECTED}>Protected route</NavLink>
                )}
            </div>

            <div className=" flex gap-8 self-end ">
                {isLoggedIn ? (
                    <NavLink to={Routes.MY_ACCOUNT}>My account</NavLink>
                ) : (
                    <>
                        <NavLink to={Routes.LOG_IN}>Log in</NavLink>
                        <NavLink to={Routes.REGISTER}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};
