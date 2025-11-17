import { useAuthContext } from '../contexts/auth/useAuthContext';

export const MyAccount = () => {
    const { userInfo } = useAuthContext();

    return (
        <main>
            <h1>My Account</h1>

            <div className="flex flex-col gap-20 w-full items-center">
                <dl className="max-w-md w-full bg-bg shadow-md rounded-small p-6 divide-y divide-secondary">
                    <div className="py-2 flex justify-between">
                        <dt>Username:</dt>
                        <dd>{userInfo?.username}</dd>
                    </div>
                    <div className="py-2 flex justify-between">
                        <dt>Email:</dt>
                        <dd>{userInfo?.email}</dd>
                    </div>
                </dl>
            </div>
        </main>
    );
};
