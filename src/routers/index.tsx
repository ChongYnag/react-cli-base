import { onRouterBeforeRule, RouteObjectRule } from "./@type/inedx";
import PrivateRoutes from "./home-routers";
import PublicRouters from "./public-routers";

const routes: RouteObjectRule[] = [
    {
        path: '*',
        redirect: '/home',
    },
    ...PublicRouters,
    ...PrivateRoutes
];

//全局路由守卫
const onRouterBefore: onRouterBeforeRule = (meta, to) => {
    const { auth, title } = meta;
    if (title) {    // 动态修改页面title
        document.title = title || '统一认证';
    }
    // 需要登录的路由，以及获取token 
    return auth ? '/login' : to
}

export default routes

export {
    onRouterBefore
}