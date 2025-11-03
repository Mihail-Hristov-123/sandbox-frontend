import { Link } from 'react-router';
import { clientRoutes } from '../routes';

export const NotFound = () => {
    return (
        <main>
            <h1>Page not found</h1>
            <Link to={clientRoutes.HOME}>Go back to home page</Link>
        </main>
    );
};
