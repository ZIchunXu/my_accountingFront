import Home from '@/pages/Home';
import Statistics from '@/pages/Statistics';
import User from '@/pages/User';
import Login from '@/pages/Login';
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        path: "/user",
        component: User
    },
    {
        path: "/login",
        component: Login
    }
];

export default routes