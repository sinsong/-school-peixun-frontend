import { useAuth } from "../../../context/auth-context"
import { Button } from "antd"

export const Login = () => {
  const { login } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", `${API_URL}/login`)
    // xhr.send(`email=${email}&password=${password}`)
    // xhr.onreadystatechange = () => {
    //     if (xhr.requestStatus === 4 && xhr.status === 200)
    //     {
    //         console.log(xhr.response)
    //     }
    // }

    login({email, password})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">用户名</label>
      <input type="text" name="email" id="email" placeholder={"请输入邮箱"} />
      <label htmlFor="password">密码</label>
      <input type="password" name="password" id="password" placeholder={"请输入密码"} />
      <Button htmlType={"submit"}>登录</Button>
    </form>
  )
}