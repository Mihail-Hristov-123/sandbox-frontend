import type { UserLoginValues } from '../schemas/auth/LoginSchema';
import type { UserRegisterValues } from '../schemas/auth/RegisterSchema';

export type AuthFetchPath = 'register' | 'login' | 'logout' | 'logout-all';

const URL_BASE = '/@api/auth/';

export const accessAuthAPI = async (
    path: AuthFetchPath,
    data?: UserRegisterValues | UserLoginValues,
) => {
    const result = await fetch(URL_BASE + path, {
        method: 'POST',
        headers: data
            ? {
                  'Content-Type': 'application/json',
              }
            : undefined,
        body: data ? JSON.stringify(data) : undefined,
    });
    return result.ok;
};
