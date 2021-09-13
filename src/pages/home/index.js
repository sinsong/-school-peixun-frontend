import { useAuth } from "../../context/auth-context"
import { Breadcrumb, Button, Dropdown, Menu, Layout, Calendar, Modal, message, Form, Input, Radio, DatePicker } from "antd"
import { DownOutlined, LogoutOutlined } from "@ant-design/icons"
import "./index.less"
import { createRef, useState } from "react"
import { useHttp } from "../../utils/http"
import { useAsync } from "../../utils/use-async"


const {Header, Content, Footer} = Layout
const { RangePicker } = DatePicker

const Home = () => {
    const [ visible, setVisible ] = useState(false) // 模态框的显示
    const { logout } = useAuth();
    const form = createRef()
    const { run, isLoading } = useAsync(undefined, {throwOnError: true})
    const postAttendance = useHttp()

    const handleCalendarSelect = (date) => {
        const currentDate = new Date();
        const dateRange = (+date) - (+currentDate) // 和空字符串拼接，隐式转换成时间戳
        if (dateRange >= 0)
        {
            setVisible(true)
        }
        else
        {
            message.info("无法为过去的时间请假")
        }
    }
    const handleAttendaceInfo = () => {
        const value = form.current.getFieldValue()
        if (value.range)
        {
            const start = value.range[0].format("YYYY-MM-DD HH:mm")
            const end = value.range[1].format("YYYY-MM-DD HH:mm")
            value.range = `${start}~${end}`
        }
        if (value.type)
        {
            switch(value.type)
            {
            case 1:
                value.type = "事假"
                break
            case 2:
                value.type = "病假"
                break
            default:
                value.type = "其他"
                break
            }
        }
        run(postAttendance("660/attendance", {method: "POST", data: value})).then(()=>{
            message.success("已提交申请")
            setVisible(false)
        }).catch((error)=>{
            message.error(error.message)
        })
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Button type="link" onClick={logout}><LogoutOutlined />登出</Button>
            </Menu.Item>
        </Menu>
    )
    return <Layout id="components-layout-demo-fixed">
        <Header style={{position: 'fixed', zIndex: 1, width: "100%"}}>
            <div className="logo">考勤管理系统</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
            <div theme="dark" style={{position: "absolute", top: "0", right: "0"}}>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button type="link" style={{paddingRight: 0}}>个人<DownOutlined /></Button>
                </Dropdown>
            </div>
        </Header>
        <Content className="site-layout" style={{padding: "0 50px", marginTop: 64}}>
            <Breadcrumb style={{margin: "16px 0"}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item >List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                <Calendar onSelect={handleCalendarSelect}></Calendar>
                <Modal title="填写请假信息" width={800} visible={visible} footer={[
                    <Button type="primary" htmlType="submit" onClick={handleAttendaceInfo}>确定</Button>,
                    <Button onClick={()=>{setVisible(false); form.current.setFieldsValue({
                        name: "", range: "", type: -1, reason: ""
                    })}}>取消</Button>
                ]}>
                    <Form onFinish={handleAttendaceInfo} ref={form}>
                        <Form.Item label="姓名" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="请假类型" name="type">
                            <Radio.Group>
                                <Radio value={1}>事假</Radio>
                                <Radio value={2}>病假</Radio>
                                <Radio value={3}>其他</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="请假时间" name="range">
                            <RangePicker showTime={{format: "HH:mm"}} format="YYYY-MM-DD HH:mm" />
                        </Form.Item>
                        <Form.Item label="请假事由" name="reason">
                            <Input.TextArea rows={8}  />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Content>
        <Footer style={{textAlign: "center"}}>考勤管理系统 CopyRight ©2021 All right reserved. </Footer>
    </Layout>
}

export default Home
