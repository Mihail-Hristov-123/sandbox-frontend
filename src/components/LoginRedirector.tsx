import { CLIENT_ROUTES } from '@/Routes';
import { Link } from 'react-router';

export const LoginRedirector = ({
    additionalText,
    className,
}: {
    additionalText: string;
    className?: string;
}) => (
    <p className={className}>
        <Link to={CLIENT_ROUTES.LOG_IN}>Log in</Link> {additionalText}
    </p>
);
