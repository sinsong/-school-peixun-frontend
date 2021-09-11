// 提供状态标志 states

import { useState, useCallback, useEffect } from "react"

// idle, loading, error, success

const defaultInitialState = {
  status: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  // 错误时是否抛出异常
  throwOnError: false
}

export const useAsync = (initialState, initialConfig) => {
  // 合并配置
  const config = { ...defaultConfig, ...initialConfig }
  // 设置状态
  const [state, setState] = useState({ ...defaultInitialState, ...initialState })
  // 设置接收到的数据
  const setData = useCallback((data) => {
    setState({
      data,
      status: "success",
      error: null
    })
  }, [])

  // 接受并设置错误
  const setError = useCallback((error) => {
    setState({
      data: null,
      status: "error",
      error: error
    })
  },
    []
  )
  // 触发异步请求
  const run = useCallback((promise) => {
    if (!promise || !promise.then) {
      throw new Error("需要传入 Promise 类型的对象")
    }
    // 请求开始，status 设置为 loading
    setState({ ...state, status: 'loading' })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError({ error })
      if (config.throwOnError === true) {
        return Promise.reject(error)
      }
      else {
        return error
      }
    })
  }, [config.throwOnError, setData, setError, state]
  )

  // useEffect(() => {
  //   return () => {
  //     setData(null)
  //     setError(null)
  //   }
  // })

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state
  }
}
