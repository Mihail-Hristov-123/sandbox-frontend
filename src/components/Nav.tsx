import { NavLink } from 'react-router';

import { useAuthContext } from '../contexts/auth/useAuthContext';
import { clientRoutes } from '../routes';

const { HOME, POSTS, MY_ACCOUNT, QUESTIONS, LOG_IN, REGISTER } = clientRoutes;

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();

    return (
        <nav className=" bg-gray-700 w-full px-24 py-2 text-white font-bold flex justify-between">
            <div className="flex gap-20">
                <NavLink to={HOME}>Home</NavLink>
                <NavLink to={POSTS}>Posts</NavLink>
                <NavLink to={QUESTIONS}>Q&A</NavLink>
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
