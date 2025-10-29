import { Route, Routes } from 'react-router';
import { Home, Login, NotFound, Posts, Register } from '../pages/index';

import { Routes as paths } from '../Routes';
import { RouteManager } from './RouteManager';

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

        <Route element={<RouteManager routesToBlock="public" />}>
            {mapRoutes([
                { path: 'REGISTER', element: <Register /> },
                { path: 'LOG_IN', element: <Login /> },
            ])}
        </Route>

        <Route element={<RouteManager routesToBlock="protected" />}>
            {mapRoutes([
                { path: 'PROTECTED', element: <h1>Protected page</h1> },
            ])}
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);
