/**
 * 私有路由，需要登录
 */
import { MetaRule, RouteObjectRule } from "../@type/inedx";

interface MetaRuleDefine extends MetaRule {
    auth?: false
}

interface RouterRule extends RouteObjectRule {
    meta: MetaRuleDefine
}
const PrivateRoutes: RouterRule[] = [
    {
        path: 'home',
        page:() => import("@/page/home/index"),
        meta: {
            auth: false
        },
        children: [
            {
                index: true, //设置默认页
                path: "*",
                meta: {
                    title: "发起申请"
                },
                page: () => import("@/page/initiate/index")
            },
            {
                path: "handle",
                meta: {
                    title: "办理中心"
                },
                page: () => import("@/page/handle/index")
            },
            {
                path: "flow",
                meta: {
                    title: "流程任务"
                },
                page: () => import("@/page/flow/index")
            }
        ]
    }
]

export default PrivateRoutes;