import qs from "qs"
import * as auth from "../auth-provider"
import { useAuth } from "../context/auth-context"

const API_URL = process.env.REACT_APP_API_URL_BASE

/**
 * 通用请求
 * @param {api url} path 
 * @param {配置} param1 
 */
export const http = async (path, {data, token, ...restConfig}) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": data ? "application/json" : "",
      Authorization: token ? `Bearer ${token}` : ""
    },
    ...restConfig
  }

  if (config.method.toUpperCase() === "GET")
  {
    path += `?${qs.stringify(data)}`
  }
  else
  {
    config.body = JSON.stringify(data);
  }

  return window.fetch(`${API_URL}/${path}`, config).then(async response => {
    if (response.status === 401)
    {
      await auth.logout()
      window.location.reload()
      return Promise.reject({messaage: "请重新登录"})
    }
    const data = await response.json()
    if (response.ok)
      return data;
    else
      return Promise.reject(new Error("请求失败"))
  })
}

// 自定义钩子命名用 use 前缀
export const useHttp = () => {
  return (...[path, config]) => http(path, {...config, token: auth.getToken()})
}