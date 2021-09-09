// const { createContext } = require("react");
import React, { useContext, useState } from 'react'
import * as auth from "../auth-provider"
import {http} from "../utils/http"

const loggedUser = async () => {
  let user = null
  let token = auth.getToken()
  if (token)
  {
    user = await http("600/users/6", {token})
  }
  return user
}

const AppContext = React.createContext(undefined)
export const AuthProvider = ({children}) => {
  // state
  const [user, setUser] = useState(null);
  // method
  const login = (form) => auth.login(form).then(setUser)
  const register = (form) => auth.register(form).then(setUser)
  const logout = () => auth.logout.then(() => setUser(null))

  // 防止刷新后 user 信息失效
  useEffect(()=>{
    loggedUser().then(setUser)
  }, [])

  // provider
  return <AppContext.Provider
    children={children}
    value={{user, login, logout, register}}
  />
}

export const useAuth = () => {
  const context = useContext(AppContext)
  if (!context)
  {
    throw new Error("user auth 必须在 AuthProvider 中使用")
  }
  return context;
}