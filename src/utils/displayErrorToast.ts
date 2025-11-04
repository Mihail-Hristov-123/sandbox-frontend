import toast from 'react-hot-toast';

export const displayErrorToast = (error: unknown, fallbackMessage: string) => {
    toast.error(error instanceof Error ? error.message : fallbackMessage);
};
