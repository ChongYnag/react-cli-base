import React, { Suspense } from "react";
import { useRoutes, Navigate, useLocation } from "react-router-dom";
import { GuardRule, FunctionRule, RouteObjectRule, MetaRule } from "../@type/inedx";

let onRouterBefore: any;
let RouterLoading: FunctionRule;


//路由导航，设置redirect重定向 和 auth权限
const Guard = ({ element, meta }: { element: any, meta: MetaRule }) => {
    const { pathname } = useLocation();
    const nextPath = onRouterBefore ? onRouterBefore(meta, pathname) : pathname;
    if (nextPath && nextPath !== pathname) {
        element = <Navigate to={nextPath} replace={true} />;
    }
    return element;
}

// 路由懒加载
// 路由懒加载
function lazyLoadRouters(page: () => Promise<{ default: React.ComponentType<any>; }>, meta: MetaRule) {
    meta = meta || {};
    const LazyElement = React.lazy(page);
    const GetElement = () => {
        return (
            <Suspense fallback={<RouterLoading />}>
                <LazyElement />
            </Suspense>
        );
    };
    return <Guard element={<GetElement />} meta={meta} />;
}

function transRoutes(routes: RouteObjectRule[]) {
    const list: any[] = [];
    routes.forEach(route => {
        const obj: any = { ...route };
        if (obj.redirect) {
            obj.element = <Navigate to={obj.redirect} replace={true} />
        }
        if (obj.page) {
            obj.element = lazyLoadRouters(obj.page, obj.meta);
        }
        if (obj.children) {
            obj.children = transRoutes(obj.children);
        }
        ['redirect', 'page', 'meta'].forEach(name => delete obj[name])
        list.push(obj)
    })

    return list
}


function RouterGuard(params: GuardRule) {
    onRouterBefore = params.onRouterBefore;
    RouterLoading = () => params.loading || <></>;
    return useRoutes(transRoutes(params.routers));
}

export default RouterGuard;