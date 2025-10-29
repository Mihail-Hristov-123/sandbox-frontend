import { Route, Routes } from 'react-router';
import { Home } from '../pages/Home';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Posts } from '../pages/Posts';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicOnlyRoutes } from './PublicOnlyRoutes';
import { Routes as paths } from '../Routes';

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

        <Route element={<PublicOnlyRoutes />}>
            {mapRoutes([
                { path: 'REGISTER', element: <Register /> },
                { path: 'LOG_IN', element: <Login /> },
            ])}
        </Route>

        <Route element={<ProtectedRoutes />}>
            {mapRoutes([
                { path: 'PROTECTED', element: <h1>Protected page</h1> },
            ])}
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);
