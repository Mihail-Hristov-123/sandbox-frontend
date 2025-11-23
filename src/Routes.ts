export const CLIENT_ROUTES = {
    HOME: '/',
    CATCHES: '/catches',
    REGISTER: '/register',
    LOG_IN: '/login',
    MY_ACCOUNT: '/me',
    QUESTIONS: '/questions',
    QUESTION_DETAILS: '/questions/:questionId',
    USERS: '/users',
    USER_DETAILS: '/users/:userId',
};

export type ClientRoute = keyof typeof CLIENT_ROUTES;

export const SERVER_ROUTES = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOGOUT_ALL: '/auth/logout-all',
    ME: '/users/me',
    QUESTIONS: '/questions',
    CATCHES: '/catches',
    LIKES: '/likes',
};
