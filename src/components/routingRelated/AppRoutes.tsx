import { Route, Routes } from 'react-router';
import {
    Catches,
    Home,
    Login,
    MyAccount,
    NotFound,
    QuestionDetails,
    Questions,
    Register,
} from '@/pages/index';

import { CLIENT_ROUTES, type ClientRoute } from '@/routes';
import { ProtectedRoute } from './ProtectedRoute';

const mapRoutes = (routes: { path: ClientRoute; element: React.ReactNode }[]) =>
    routes.map(({ path, element }) => (
        <Route key={path} path={CLIENT_ROUTES[path]} element={element} />
    ));

export const AppRoutes = () => (
    <Routes>
        {mapRoutes([
            { path: 'HOME', element: <Home /> },
            { path: 'CATCHES', element: <Catches /> },
            { path: 'QUESTIONS', element: <Questions /> },
            { path: 'QUESTION_DETAILS', element: <QuestionDetails /> },
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
