import { useEffect, useState } from 'react';
import { LogoutForm } from '../components/LogoutForm';
import { useUserService } from '../hooks/useUserService';
import { LoadingScreen } from '../components/LoadingSVG';
import type { UserReturnValues } from '../schemas/auth/RegisterSchema';
import { displayErrorToast } from '../utils/displayErrorToast';

export const MyAccount = () => {
    const { getCurrentUserInfo } = useUserService();

    const [userInfo, setUserInfo] = useState<UserReturnValues | null>(null);

    useEffect(() => {
        const updateUserInfo = async () => {
            try {
                const response = await getCurrentUserInfo();
                if (!response?.body?.data) {
                    throw new Error('Failed to fetch user info');
                }
                setUserInfo(response.body.data);
            } catch (error) {
                displayErrorToast(error, ' Could not fetch user data');
            }
        };
        updateUserInfo();
    }, [getCurrentUserInfo]);

    if (!userInfo) {
        return <LoadingScreen />;
    }

    return (
        <main>
            <h1>My Account</h1>

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
                <div className=" fixed bottom-0 w-full">
                    {' '}
                    <LogoutForm />
                </div>
            </div>
        </main>
    );
};
