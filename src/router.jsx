import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import AdminComponents from "./components/AdminComponents";
import NotFound from "./views/NotFound";
import UserComponents from "./components/UserComponents";
import Dashboard from "./views/Dashboard";
import AccountSetting from "./views/AccountSetting";
import AddPrecinctNumber from "./views/AddPrecinctNumber";
import EditAccount from "./views/EditAccount";
import AddAdmin from "./views/AddAdmin";

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
                    children: [
                        {
                            path: 'account/add-precinct-number',
                            element: <AddPrecinctNumber/>
                        },
                        {
                            path: 'account/edit-account',
                            element: <EditAccount/>
                        },
                        {
                            path: 'account/add-admin',
                            element: <AddAdmin/>
                        },

                    ]
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