import { NavLink } from 'react-router';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { clientRoutes } from '../routes';
import burgerMenuSVG from '../assets/burger.svg';
import profilePic from '../assets/user.png';
import { useAuthService } from '../hooks/useAuthService';

const { HOME, POSTS, MY_ACCOUNT, QUESTIONS, LOG_IN, REGISTER } = clientRoutes;

export const Nav = () => {
    const { isLoggedIn } = useAuthContext();
    const { logOut } = useAuthService();
    return (
        <nav className="bg-primary w-full px-8 py-4 text-white font-bold flex justify-between items-center">
            <div className="relative group pr-4 cursor-pointer">
                <img
                    src={burgerMenuSVG}
                    className="w-6"
                    alt="Dropdown menu icon"
                />

                <menu className="absolute  flex-col items-center rounded-b-xl gap-2 top-full bg-primary px-8 py-2 hidden group-hover:flex">
                    <NavLink to={POSTS}>Posts</NavLink>
                    <NavLink to={QUESTIONS}>Questions</NavLink>
                </menu>
            </div>

            <NavLink to={HOME}>The Tackle Box</NavLink>

            <div className="relative group pl-4">
                <img src={profilePic} className="w-8" alt="User profile pic" />

                <menu className="absolute rounded-b-xl flex-col items-center top-full gap-2 right-0 bg-primary px-8 py-2 hidden group-hover:flex whitespace-nowrap">
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
                </menu>
            </div>
        </nav>
    );
};
