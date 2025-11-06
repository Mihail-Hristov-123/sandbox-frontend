import { LogoutForm } from '../components/formRelated/LogoutForm';

import { LoadingScreen } from '../components/loading/LoadingScreen';

import { useCurrentUserInfo } from '../hooks/useCurrentUserInfo';

export const MyAccount = () => {
    const { userInfo } = useCurrentUserInfo();

    if (!userInfo) {
        return <LoadingScreen />;
    }

    return (
        <main>
            <h1 className="text-center text-3xl font-semibold my-8 text-gray-800">
                My Account
            </h1>

            <div className="flex flex-col gap-20 w-full items-center">
                <dl className="max-w-md w-full bg-white shadow-md rounded-lg p-6 divide-y divide-gray-200">
                    <div className="py-2 flex justify-between">
                        <dt className="text-gray-600 font-medium">Username:</dt>
                        <dd className="text-gray-700 font-semibold">
                            {userInfo.username}
                        </dd>
                    </div>
                    <div className="py-2 flex justify-between">
                        <dt className="text-gray-600 font-medium">Email:</dt>
                        <dd className="text-gray-700 font-semibold">
                            {userInfo.email}
                        </dd>
                    </div>
                </dl>
                <LogoutForm />
            </div>
        </main>
    );
};
