import { useAuth } from "../../context/auth-context"
import { Button } from "antd"

const Home = () => {
    const { logout } = useAuth();
    return <Button type={"primary"} onClick={logout}>登出</Button>
}

export default Home
