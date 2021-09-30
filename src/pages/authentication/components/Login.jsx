import "../index.css"
import { useAuth } from "../../../context/auth-context"
import { Button, Form, Input, message, Radio } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useAsync } from "../../../utils/use-async"

export const Login = () => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = (value) => {
    run(login(value)).catch(error=>{
      message.error(error.message)
    })
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="账号：" name="account" rules={[
        {
          required: true,
          message: "请输入您的账号"
        }
      ]}>
        <Input prefix={<UserOutlined />} placeholder="请输入账号" className="site-form-item-icon" />
      </Form.Item>
      <Form.Item label="密码：" name="password" rules={[
        {
          required: true,
          message: "请输入您的密码"
        }
      ]}>
        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" className="site-form-item-icon" />
      </Form.Item>
      <Form.Item name="role">
        <Radio.Group defaultValue={0}>
          <Radio value={0}>学生</Radio>
          <Radio value={1}>教师</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button loading={ isLoading } style={{width: "100%"}} type={"primary"} htmlType={"submit"}>登录</Button>
      </Form.Item>
    </Form>
  )
}