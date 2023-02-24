import { Button } from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store';
import { addScore, minusScore, addScoreAsync } from "@/store/auth/auth.slice"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Badge, TabBar } from 'antd-mobile'
import {
    AppOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import { useState } from 'react';
import styles from "./index.module.scss";
const Test = () => {
    const { name, count } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();
    return <>
        <p className="home"> hello,{name}</p>
        得分:<Button onClick={() => dispatch(minusScore())} color="danger" size="small">-</Button> {count} <Button onClick={() => dispatch(addScore())} color="primary" size="small">+</Button>

        <Button onClick={() => dispatch(addScoreAsync(7))}>异步状态+7</Button>
        <NavLink to='/'>首页</NavLink> |
        <NavLink to='/login'>登录</NavLink> |
    </>
}
const App = () => {
    const tabs = [
        {
            key: 'home',
            title: '发起',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: 'handle',
            title: '办理',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: 'flow',
            title: '流程',
            icon: <UserOutline />,
        },
    ]
    const { pathname } = useLocation();
    let _pathname = pathname.replace("/home/", "")
    const [activeKey, setActiveKey] = useState(_pathname)
    const navigate = useNavigate();
    const tabChange = (e: any) => {
        setActiveKey(e);
        navigate(e)
    }
    return <>
        <div className={styles.home}>
            {<Test />}
            {
                <Outlet />
            }
            <div className='foot'>
                <TabBar safeArea activeKey={activeKey} onChange={tabChange}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>

        </div>
    </>
}
export default App;
