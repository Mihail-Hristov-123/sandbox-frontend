import { SERVER_ROUTES, type ServerRoute } from '../../routes';

export const isServerPath = (path: string): path is ServerRoute =>
    path in SERVER_ROUTES;
