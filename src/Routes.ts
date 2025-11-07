export const clientRoutes = {
    HOME: '/',
    POSTS: '/posts',
    REGISTER: '/register',
    LOG_IN: '/login',
    MY_ACCOUNT: '/me',
    QUESTIONS: '/questions',
    EVENTS: '/events',
    QUESTION_DETAILS: '/questions/:questionId',
};

// to be mostly replaced by types from open-api

type RouteGroup = 'auth' | 'users';

const createApiRoute = (routeGroup: RouteGroup, path: string) =>
    `/${routeGroup}/${path}`;

export const apiRoutes = {
    REGISTER: createApiRoute('auth', 'register'),
    LOGIN: createApiRoute('auth', 'login'),
    LOGOUT: createApiRoute('auth', 'logout'),
    LOGOUT_ALL: createApiRoute('auth', 'logout-all'),
    ME: createApiRoute('users', 'me'),
    QUESTIONS: '/questions',
};
