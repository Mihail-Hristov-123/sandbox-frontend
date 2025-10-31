import { Route, Routes } from 'react-router';
import {
    Home,
    Login,
    MyAccount,
    NotFound,
    Posts,
    Register,
} from '../pages/index';

import { Routes as paths } from '../Routes';
import { ProtectedRoute } from './ProtectedRoute';

const mapRoutes = (
    routes: { path: keyof typeof paths; element: React.ReactNode }[],
) =>
    routes.map(({ path, element }) => (
        <Route key={path} path={paths[path]} element={element} />
    ));

export const AppRoutes = () => (
    <Routes>
        {mapRoutes([
            { path: 'HOME', element: <Home /> },
            { path: 'POSTS', element: <Posts /> },
        ])}

        <Route element={<ProtectedRoute routesToBlock="public" />}>
            {mapRoutes([
                { path: 'REGISTER', element: <Register /> },
                { path: 'LOG_IN', element: <Login /> },
            ])}
        </Route>

        <Route element={<ProtectedRoute routesToBlock="protected" />}>
            {mapRoutes([
                { path: 'PROTECTED', element: <h1>Protected page</h1> },
                { path: 'MY_ACCOUNT', element: <MyAccount /> },
            ])}
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);
