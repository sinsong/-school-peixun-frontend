const API_URL = process.env.REACT_APP_API_URL_BASE

const localstorageKey = "__ca_access_token__";

export const getToken = () => window.localStorage.getItem(localstorageKey)

export const handleUserResponse = (user) => {
  window.localStorage.setItem(localstorageKey, user.accessToken || "");
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

export const logout = () => {
  window.localStorage.removeItem(localstorageKey)
}

