import type { RegisterValues } from 'tacklebox-schemas';

export type User = Pick<RegisterValues, 'email' | 'username'> & {
    id: number;
    profile_pic_url: string | null;
};
