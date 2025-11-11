import { Route, Routes } from 'react-router';
import {
    Catches,
    Events,
    Home,
    Login,
    MyAccount,
    NotFound,
    QuestionDetails,
    Questions,
    Register,
} from '../pages/index';

import { clientRoutes } from '../routes';
import { ProtectedRoute } from './ProtectedRoute';

const mapRoutes = (
    routes: { path: keyof typeof clientRoutes; element: React.ReactNode }[],
) =>
    routes.map(({ path, element }) => (
        <Route key={path} path={clientRoutes[path]} element={element} />
    ));

export const AppRoutes = () => (
    <Routes>
        {mapRoutes([
            { path: 'HOME', element: <Home /> },
            { path: 'CATCHES', element: <Catches /> },
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
