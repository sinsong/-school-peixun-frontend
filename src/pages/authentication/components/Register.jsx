import { useAuth } from "../../../context/auth-context"
import { Button, Form, Input } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

const Item = Form.Item // 用来缩写

export const Register = () => {
  const { register } = useAuth()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    register({email, password})
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="邮箱" name="email" rules={[
        {
          required: true,
          message: "请输入合法的邮箱"
        }
      ]}>
        <Input prefix={<UserOutlined />} placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[
        {
          required: true,
          message: "请输入密码"
        }
      ]}>
        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button style={{width: "100%"}} type={"primary"} htmlType={"submit"}>注册</Button>
      </Form.Item>
    </Form>
  )
}
