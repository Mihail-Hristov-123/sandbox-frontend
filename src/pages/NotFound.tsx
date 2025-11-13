import { Link } from 'react-router';
import { CLIENT_ROUTES } from '../routes';

export const NotFound = () => {
    return (
        <main>
            <h1>Page not found</h1>
            <Link to={CLIENT_ROUTES.HOME}>Go back to home page</Link>
        </main>
    );
};
