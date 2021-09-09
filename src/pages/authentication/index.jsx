import { useState } from "react";
import { Login } from "./components/Login"
import { Register } from "./components/Register"

const Authentication = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            {
                isRegister ? <Register /> : <Login />
            }
            <a onClick={ () => { setIsRegister(!isRegister) } }>
                { !isRegister ? "请注册" : "请登录" }
            </a>
        </div>
    )
}

// 只导出这玩意
export default Authentication
