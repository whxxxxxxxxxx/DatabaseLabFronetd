import Login from '@/pages/Login';
import User from '@/pages/User';
import Product from '@/pages/Product';
import Order from '@/pages/Order';
import Layout from '@/pages/Layout';
import Register from '@/pages/Register';
import Info from '@/pages/Info';
import Setting from '@/pages/Setting';
import Publish from '@/pages/Publish';
import ProductEdit from '@/pages/ProductEdit';
import ProductDetail from '@/pages/ProductDetail';
import ProductList from '@/pages/ProductList';
import {createBrowserRouter} from 'react-router-dom';
import {AuthRoute} from '@/components/AuthRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layout /> </AuthRoute>,
        children: [
            {
                path:'user/',
                element:<User />,
                children:[
                    {
                        path:'info',
                        element:<Info />
                    },
                    {
                        path:'setting',
                        element:<Setting />
                    }
                ]
            },
            {
                path:'publish',
                element:<Publish />
            },
            {
                path:'product/',
                element:<AuthRoute> <Product /> </AuthRoute>,
                children:[
                    {
                        path:'detail/:id',
                        element:<ProductDetail />
                    },
                    {
                        path:'list',
                        element:<ProductList />
                    },
                    {
                        path:'edit/:id',
                        element:<ProductEdit />
                    }
                ]
            },
            {
                path:'order',
                element:<Order />
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