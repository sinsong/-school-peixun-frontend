import { useAuth } from "../../../context/auth-context"
import { Button, Form, Input } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

export const Login = () => {
  const { login } = useAuth();
  const handleSubmit = (value) => {
    login(value)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="邮箱：" name="email" rules={[
        {
          required: true,
          message: "请输入您的邮箱"
        }
      ]}>
        <Input prefix={<UserOutlined />} placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="密码：" name="password" rules={[
        {
          required: true,
          message: "请输入您的密码"
        }
      ]}>
        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button style={{width: "100%"}} type={"primary"} htmlType={"submit"}>登录</Button>
      </Form.Item>
    </Form>
  )
}