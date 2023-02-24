import { login } from "@/service";
import { Button } from "antd-mobile";
import { useState } from "react";
const Login: React.FC = () => {
    const [title] = useState<string>("平台");
    return <>
        <div >
            <h1>{title}</h1>
            <Button onClick={() => {
                login({ username: "admin", pwd: "admin" })
            }}>登录</Button>
        </div>
    </>
}
export default Login;