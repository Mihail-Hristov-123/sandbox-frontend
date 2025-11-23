import { useParams } from 'react-router';

export const UserDetails = () => {
    const { userId } = useParams();

    return <h1>User {userId} details</h1>;
};
