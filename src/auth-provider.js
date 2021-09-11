const API_URL = process.env.REACT_APP_API_URL_BASE

const localstorageKey = "__ca_access_token__"
const userIDStorageKey = "__ca_user_id__"

export const getToken = () => window.localStorage.getItem(localstorageKey)
export const getCurrentUserID = () => window.localStorage.getItem(userIDStorageKey)
export const handleUserResponse = (user) => {
  window.localStorage.setItem(localstorageKey, user.accessToken || "")
  window.localStorage.setItem(userIDStorageKey, user.user.id || "")
  return user
}

export const login = (data) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    }
    else {
      return Promise.reject(new Error("登录失败，请检查账户是否正确"))
    }
  })
}

export const register = (data) => {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
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

