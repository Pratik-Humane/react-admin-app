import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const ResetPassword = Loadable(lazy(() => import("./ResetPassword")));
const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));

const sessionRoutes = [
    {
        path: '/auth/signup',
        element: <JwtRegister />,
    },
    {
        path: '/auth/signin',
        element: <JwtLogin />,
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password/:code',
        element: <ResetPassword />,
    },
    {
        path: '/session/404',
        element: <NotFound />,
    },
]

export default sessionRoutes
