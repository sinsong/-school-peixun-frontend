import { useAuth } from "../../../context/auth-context"
import { Button, Form, Input, message, notification, Radio } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useAsync } from "../../../utils/use-async"

const Item = Form.Item // 用来缩写

export const Register = () => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  
  const handleSubmit = ({cpassword, ...value}) => {
    if (cpassword === value.password)
    {
      run(register(value)).catch((error)=>{
        message.error(error.message)
      })
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
      <Form.Item label="账号" name="account" rules={[
        {
          required: true,
          message: "请输入账号"
        }
      ]}>
        <Input prefix={<UserOutlined />} placeholder="请输入账号" className="site-form-item-icon" />
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
      <Form.Item name="role">
        <Radio.Group defaultValue={0}>
          <Radio value={0}>学生</Radio>
          <Radio value={1}>教师</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="姓名" name="name">
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item label="班级" name="clazz">
        <Input placeholder="请输入班级" />
      </Form.Item>
      <Form.Item>
        <Button loading={ isLoading } style={{width: "100%"}} type={"primary"} htmlType={"submit"}>注册</Button>
      </Form.Item>
    </Form>
  )
}
