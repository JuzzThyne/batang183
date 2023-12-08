import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";

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
    ]
)

export default router;