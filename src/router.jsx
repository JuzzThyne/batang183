import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App/>,
            children: [
                
                {
                    path: '/',
                    element: <Navigate to='/login'/>
                },
                {
                    path: '/login',
                    element: <Login/>,
                }, 
            ]
        },
        {
            path: '/dashboard',
            element: <Dashboard/>,
        },
    ]
)

export default router;