import Login from '@/pages/Login';
import User from '@/pages/User';
import Layout from '@/pages/Layout';
import Register from '@/pages/Register';
import {createBrowserRouter} from 'react-router-dom';
import {AuthRoute} from '@/components/AuthRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layout /> </AuthRoute>,
        children: [
            {
                path:'user',
                element:<User />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register/>,
    }

]);

export default router;