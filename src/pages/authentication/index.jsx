import { useState } from "react";
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Button, Card } from "antd"
import left from "../../assets/left.svg"
import right from "../../assets/right.svg"

const Authentication = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <>
            <div style={{width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "left bottom, right bottom", backgroundSize: "calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover", backgroundImage: `url(${left}), url(${right})`, position: "absolute"}}></div>
            <h1 style={{textAlign: "center", padding: "5rem 10rem"}}>考勤管理系统</h1>
            <Card style={{
                width: "40rem",
                minHeight: "50rem",
                margin: "2rem auto",
                boxShadow: "rgba(0,0,0,0.1) 0 0 10px"
            }}>
                <h2 style={{textAlign:"center", marginBottom: "4rem", color: "rgb(97, 108, 130)"}}>{ isRegister ? "请注册" : "请登录" }</h2>
                {
                    isRegister ? <Register /> : <Login />
                }
                <Button type="link" onClick={() => { setIsRegister(!isRegister) }}>
                    {!isRegister ? "没有账号？请注册账号" : "已有账号？请登录"}
                </Button>
            </Card>
        </>
    )
}

// 只导出这玩意
export default Authentication
