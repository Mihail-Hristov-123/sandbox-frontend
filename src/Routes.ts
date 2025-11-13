export const CLIENT_ROUTES = {
    HOME: '/',
    POSTS: '/posts',
    REGISTER: '/register',
    LOG_IN: '/login',
    MY_ACCOUNT: '/me',
    QUESTIONS: '/questions',
    EVENTS: '/events',
    QUESTION_DETAILS: '/questions/:questionId',
};

export type ClientRoute = keyof typeof CLIENT_ROUTES;

// to be mostly replaced by types from open-api

export const SERVER_ROUTES = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOGOUT_ALL: '/auth/logout-all',
    ME: '/users/me',
    QUESTIONS: '/questions',
};

export type ServerRoute = keyof typeof SERVER_ROUTES;
