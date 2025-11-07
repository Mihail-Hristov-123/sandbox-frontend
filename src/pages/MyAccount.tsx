import { LoadingScreen } from '../components/LoadingScreen';

import { useCurrentUserInfo } from '../hooks/useCurrentUserInfo';

export const MyAccount = () => {
    const { userInfo } = useCurrentUserInfo();

    if (!userInfo) {
        return <LoadingScreen />;
    }

    return (
        <main>
            <h1>My Account</h1>

            <div className="flex flex-col gap-20 w-full items-center">
                <dl className="max-w-md w-full bg-bg shadow-md rounded-small p-6 divide-y divide-secondary">
                    <div className="py-2 flex justify-between">
                        <dt>Username:</dt>
                        <dd>{userInfo.username}</dd>
                    </div>
                    <div className="py-2 flex justify-between">
                        <dt>Email:</dt>
                        <dd>{userInfo.email}</dd>
                    </div>
                </dl>
            </div>
        </main>
    );
};
