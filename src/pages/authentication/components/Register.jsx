import { useAuth } from "../../../context/auth-context"
import { Button, Form, Input } from "antd"

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
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[
        {
          required: true,
          message: "请输入密码"
        }
      ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button style={{width: "100%"}} type={"primary"} htmlType={"submit"}>注册</Button>
      </Form.Item>
    </Form>
  )
}
