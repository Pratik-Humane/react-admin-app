import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import userRoutes from 'app/views/users/UserRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...userRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="app/dashboard" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
