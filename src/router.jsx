import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import AdminComponents from "./components/AdminComponents";
import NotFound from "./views/NotFound";
import UserComponents from "./components/UserComponents";
import Dashboard from "./views/Dashboard";
import App from "./App";
import AccountSetting from "./views/AccountSetting";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <UserComponents/>,
            children: [
                {
                    path: '/',
                    element: <Navigate to='/dashboard'/>
                },
                {
                    path: '/dashboard',
                    element: <Dashboard/>,
                }, 
                {
                    path: '/account',
                    element: <AccountSetting/>,
                },
            ]
        },
        {
            path: '/',
            element: <AdminComponents/>,
            children: [
                {
                    path: '/login',
                    element: <Login/>,
                },
            ]
        },
        {
            path: '*',
            element: <NotFound/>,
        },
    ]
)

export default router;