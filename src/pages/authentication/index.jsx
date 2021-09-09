import { useState } from "react";
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Button, Card } from "antd"

const Authentication = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <Card style={{
            width: "40rem",
            minHeight: "50rem",
            margin: "2rem auto"
        }}>
            {
                isRegister ? <Register /> : <Login />
            }
            <Button type="link" onClick={() => {setIsRegister(!isRegister)}}>
                { !isRegister ? "请注册" : "请登录" }
            </Button>
        </Card>
    )
}

// 只导出这玩意
export default Authentication
