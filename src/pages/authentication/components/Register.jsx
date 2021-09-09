import { useAuth } from "../../../context/auth-context"
import { Button } from "antd"

export const Register = () => {
  const { register } = useAuth()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    register({email, password})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">邮箱:</label>
      <input type="text" name="email" id="email" placeholder={"请输入合法的邮箱"}></input>
      <label htmlFor="password">密码:</label>
      <input text="password" name="password" id="password" placeholder={"请输入密码"}></input>
      <Button type={"submit"}>注册</Button>
    </form>
  )
}
