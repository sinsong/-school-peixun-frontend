// import logo from './logo.svg';
import './App.less';
import { AuthProvider, useAuth } from './context/auth-context';
import PageLoading from './components/page-loading';

// 延迟加载 (懒加载)
import React from 'react'
const Authentication = React.lazy(() => {
  return Promise.all([
    import("./pages/authentication"),
    new Promise(resolve => setTimeout(resolve, 3000))
]).then(([moduleExports]) => moduleExports)
})

const Home = React.lazy(() => {
  return Promise.all([
    import("./pages/home"),
    new Promise(resolve => setTimeout(resolve, 3000))
  ]).then(([moduleExports]) => moduleExports)
})

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* fallback 是渲染属性 */}
      <React.Suspense fallback={ <PageLoading /> }>
        { user ? <Home /> : <Authentication /> }
      </React.Suspense>
    </div>
  );
}

export default App;
