import { Route, Routes } from 'react-router';
import {
    Home,
    Login,
    MyAccount,
    NotFound,
    Posts,
    Questions,
    Register,
} from '../pages/index';

import { clientRoutes } from '../routes';
import { ProtectedRoute } from './ProtectedRoute';
import { QuestionsAndAnswers } from '../pages/Questions';

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
            { path: 'POSTS', element: <Posts /> },
            { path: 'QUESTIONS', element: <Questions /> },
        ])}

        <Route element={<ProtectedRoute routesToBlock="public" />}>
            {mapRoutes([
                { path: 'REGISTER', element: <Register /> },
                { path: 'LOG_IN', element: <Login /> },
            ])}
        </Route>

        <Route element={<ProtectedRoute routesToBlock="protected" />}>
            {mapRoutes([
                { path: 'QUESTIONS', element: <QuestionsAndAnswers /> },
                { path: 'MY_ACCOUNT', element: <MyAccount /> },
            ])}
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);
