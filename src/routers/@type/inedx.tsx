import { NonIndexRouteObject } from 'react-router-dom';

interface FunctionRule {
    (): any
}
interface MetaRule {
    auth?: boolean, //是否需要登录验证
    title?: string, //页面title
}

// 单个路由规则
interface RouteObjectRule extends NonIndexRouteObject {
    children?: RouteObjectRule[], //子路由
    page?: FunctionRule, //route导入页面的对象
    path?: string, //页面路径
    redirect?: string,//重定向地址，常用语页面默认地址
    meta?: MetaRule,//页面参数
    index?: any,
}

interface onRouterBeforeRule<meta = MetaRule, to = string> {
    (meta: meta, to: to): any | never
}

interface GuardRule {
    routers: RouteObjectRule[],
    onRouterBefore?: onRouterBeforeRule
    loading?: React.ReactNode;
}

export type {
    RouteObjectRule,
    MetaRule,
    onRouterBeforeRule,
    GuardRule,
    FunctionRule
}