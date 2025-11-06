import { Link, NavLink } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { clientRoutes } from '../routes';
import logo from '../assets/logo.png';

const { HOME, POSTS, MY_ACCOUNT, QUESTIONS, LOG_IN, REGISTER } = clientRoutes;

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();
    return (
        <nav className=" text-xl font-medium  ">
            <div className="bg-primary flex justify-between items-center text-white py-2 px-10 ">
                <Link to={HOME}>
                    <img src={logo} className=" w-36" alt="Tackle box logo" />
                </Link>

                <div className=" space-x-10">
                    {isLoggedIn ? (
                        <>
                            <Link to={MY_ACCOUNT}>My profile</Link>
                        </>
                    ) : (
                        <>
                            <Link to={LOG_IN}>Log in</Link>
                            <Link to={REGISTER}>Register</Link>
                        </>
                    )}
                </div>
            </div>
            <menu className="no-underline py-2 flex justify-center gap-8  ">
                <NavLink to={POSTS}>Posts</NavLink>
                <NavLink to={QUESTIONS}>Questions</NavLink>
            </menu>
        </nav>
    );
};
