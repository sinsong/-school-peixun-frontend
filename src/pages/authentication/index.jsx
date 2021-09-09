import { useState } from "react";
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Button } from "antd"

const Authentication = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            {
                isRegister ? <Register /> : <Login />
            }
            <Button type="link" onClick={() => {setIsRegister(!isRegister)}}>
                { !isRegister ? "请注册" : "请登录" }
            </Button>
        </div>
    )
}

// 只导出这玩意
export default Authentication
