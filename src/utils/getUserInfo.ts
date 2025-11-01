export const getUserInfo = async () => {
    const result = await fetch('/@api/users/me');
    if (!result.ok) {
        throw new Error('Error loading user information');
    }
    const data = await result.json();
    return data;
};
