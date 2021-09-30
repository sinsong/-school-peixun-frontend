import { message } from "antd"

const API_URL = process.env.REACT_APP_API_URL_BASE

const localstorageKey = "__ca_access_token__"
const userIDStorageKey = "__ca_user_id__"
const userRoleStorageKey = "__ca_user_role__"

export const getToken           = () => window.localStorage.getItem(localstorageKey)
export const getCurrentUserID   = () => window.localStorage.getItem(userIDStorageKey)
export const getCurrentUserRole = () => window.localStorage.getItem(userRoleStorageKey)

export const handleUserResponse = (responseBody) => {
  // 处理登录响应
  // window.localStorage.setItem(localstorageKey, response.accessToken || "")
  // 用户id
  window.localStorage.setItem(userIDStorageKey, responseBody.user.id || "")
  // 用户角色
  window.localStorage.setItem(userRoleStorageKey, responseBody.role)
  return responseBody
}

export const login = (data) => {
  // 重新组织请求体
  var reqbody = {
    user: {
      account: data["account"],
      pwd: data["password"]
    },
    role: data["role"]
  }
  // 发送请求
  return fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include', // 为了保持登录
    body: JSON.stringify(reqbody)
  }).then(async (response) => {
    // 处理响应
    if (response.ok) {
      return handleUserResponse(await response.json())
    }
    else {
      return Promise.reject(new Error("登录失败，请检查账户是否正确"))
    }
  })
}

export const register = (data) => {
  // 重新组织请求体
  var reqbody = {
    user: {
      account: data["account"],
      pwd: data["password"],
    },
    info: {
      name: data["name"],
      clazz: data["clazz"]
    },
    role: data["role"]
  }
  // 发起请求
  return fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqbody)
  }).then(async (response) => {
    if (response.ok) {
      var responseJson = await response.json()
      // 账号存在判定
      if (responseJson.status !== 0)
      {
        return Promise.reject(new Error(responseJson.msg))
      }
      message.success("注册成功")
      setTimeout(()=>{window.location.reload()}, 1000) 
      // return handleUserResponse(await response.json())
    }
    else {
      return Promise.reject(new Error("注册失败，请检查输入"))
    }
  })
}

// auth-context 里头会 logout().then() 所以需要 async 关键字，从而返回一个 Promise
export const logout = async () => {
  window.localStorage.removeItem(localstorageKey)
}

