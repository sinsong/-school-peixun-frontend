import React from 'react'

export const lazyImport = (res, time) => {
  return React.lazy(()=>Promise.all([
    res,
    new Promise(resolve => setTimeout(resolve, time))
  ]).then(([moduleExports]) => moduleExports))
}
