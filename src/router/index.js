import Home from '@/pages/Home';
import Statistics from '@/pages/Statistics';
import User from '@/pages/User';
import Login from '@/pages/Login';
import Detail from '@/pages/Detail';
import UserInfo from '@/pages/UserInfo';
import UserPassword from '@/pages/UserPassword';
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
    },
    {
        path: "/detail",
        component: Detail
    },
    {
        path: "/user/edit",
        component: UserInfo
    },
    {
        path: "/user/password",
        component: UserPassword
    }
];

export default routes