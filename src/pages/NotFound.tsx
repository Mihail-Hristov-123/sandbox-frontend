import { Link } from 'react-router';
import { Routes } from '../Routes';

export const NotFound = () => {
    return (
        <main>
            <h1>Page not found</h1>
            <Link to={Routes.HOME}>Go back to home page</Link>
        </main>
    );
};
