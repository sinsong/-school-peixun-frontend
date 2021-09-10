// import logo from './logo.svg';
import './App.less';
import React from 'react'
import { AuthProvider, useAuth } from './context/auth-context';
import PageLoading from './components/page-loading';
import { lazyImport } from './utils/lazyimport';

// 延迟加载 (懒加载)
const Authentication = lazyImport(import("./pages/authentication"), 3000)
const Home = lazyImport(import("./pages/home"), 3000)

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
