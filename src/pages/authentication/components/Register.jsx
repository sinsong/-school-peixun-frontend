import { useAuth } from "../../../context/auth-context"
import { Button, Form, Input, notification } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

const Item = Form.Item // 用来缩写

export const Register = () => {
  const { register } = useAuth()
  
  const handleSubmit = ({cpassword, ...value}) => {
    if (cpassword === value.password)
    {
      register(value)
    }
    else
    {
      notification["error"]({
        message: "注册失败",
        description: "密码不匹配"
      })
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="邮箱" name="email" rules={[
        {
          required: true,
          message: "请输入合法的邮箱"
        }
      ]}>
        <Input prefix={<UserOutlined />} placeholder="请输入邮箱" className="site-form-item-icon" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[
        {
          required: true,
          message: "请输入密码"
        }
      ]}>
        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" className="site-form-item-icon" />
      </Form.Item>
      <Form.Item label="确认" name="cpassword" rules={[
        {
          required: true,
          message: "密码不一致"
        }
      ]}>
        <Input.Password prefix={<LockOutlined />} placeholder="确认密码" className="site-form-item-icon" />
      </Form.Item>
      <Form.Item>
        <Button style={{width: "100%"}} type={"primary"} htmlType={"submit"}>注册</Button>
      </Form.Item>
    </Form>
  )
}
