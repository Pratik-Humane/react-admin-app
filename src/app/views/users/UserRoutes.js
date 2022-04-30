import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const UserProfile = Loadable(lazy(() => import('./UserProfile')))

const userRoutes = [
    {
        path: 'app/user-profile',
        element: <UserProfile />,
        auth: authRoles.admin,
    },
]

export default userRoutes
