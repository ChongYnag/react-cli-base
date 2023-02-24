/**
 * 共有路由，不需要登录
 */
import { MetaRule, RouteObjectRule } from "../@type/inedx";

interface MetaRuleDeffine extends MetaRule {
    auth?: false
}
interface RouterRule extends RouteObjectRule {
    meta: MetaRuleDeffine
}
const PublicRouters: RouterRule[] = [
    {
        path: "login",
        meta: {
            title: "登录"
        },
        page: () => import("@/page/login/index")
    }
]

export default PublicRouters;