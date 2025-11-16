import { Route, Routes } from 'react-router';
import {
    Events,
    Home,
    Login,
    MyAccount,
    NotFound,
    Posts,
    QuestionDetails,
    Questions,
    Register,
} from '../../pages/index';

import { CLIENT_ROUTES, type ClientRoute } from '../../routes';
import { ProtectedRoute } from './ProtectedRoute';

const mapRoutes = (routes: { path: ClientRoute; element: React.ReactNode }[]) =>
    routes.map(({ path, element }) => (
        <Route key={path} path={CLIENT_ROUTES[path]} element={element} />
    ));

export const AppRoutes = () => (
    <Routes>
        {mapRoutes([
            { path: 'HOME', element: <Home /> },
            { path: 'POSTS', element: <Posts /> },
            { path: 'QUESTIONS', element: <Questions /> },
            { path: 'QUESTION_DETAILS', element: <QuestionDetails /> },
            { path: 'EVENTS', element: <Events /> },
        ])}

        <Route element={<ProtectedRoute routesToBlock="public" />}>
            {mapRoutes([
                { path: 'REGISTER', element: <Register /> },
                { path: 'LOG_IN', element: <Login /> },
            ])}
        </Route>

        <Route element={<ProtectedRoute routesToBlock="protected" />}>
            {mapRoutes([{ path: 'MY_ACCOUNT', element: <MyAccount /> }])}
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);
