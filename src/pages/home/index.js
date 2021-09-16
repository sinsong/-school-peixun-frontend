import { Button, Dropdown, Menu, Layout } from "antd"
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import { DownOutlined, LogoutOutlined } from "@ant-design/icons"
import "./index.less"
import { useAuth } from "../../context/auth-context"
import Attendance from "../attendance"
import AttendanceList from "../att-list"

const { Header, Content, Footer } = Layout

const Home = () => {
    const { logout } = useAuth();
    const history = useHistory()

    const handleLogout = () => {
        logout().then(() => {
            history.replace("/")
        })
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Button type="link" onClick={handleLogout}><LogoutOutlined />登出</Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout id="components-layout-demo-fixed">
            <Header style={{ position: 'fixed', zIndex: 1, width: "100%" }}>
                <div className="logo">考勤管理系统</div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="apply">请假申请</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="manage">考勤管理</Link>
                    </Menu.Item>
                </Menu>
                <div style={{ position: "absolute", top: "0", right: "0" }}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type="link" style={{ paddingRight: 0 }}>个人<DownOutlined /></Button>
                    </Dropdown>
                </div>
            </Header>
            <Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
                <Switch>
                    <Route path="/apply">
                        <Attendance />
                    </Route>
                    <Route path="/manage">
                        <AttendanceList />
                    </Route>
                    <Redirect from="/" to="/apply"></Redirect>
                </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>考勤管理系统 CopyRight ©2021 All right reserved. </Footer>
        </Layout>

    )
}

export default Home
