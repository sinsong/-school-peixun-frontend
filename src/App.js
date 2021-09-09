// import logo from './logo.svg';
import './App.css';
import { AuthProvider, useAuth } from './context/auth-context';

// 延迟加载 (懒加载)
import React from 'react'
const Authentication = React.lazy(() => import("./pages/authentication"))
const Home = React.lazy(() => import("./pages/home"))

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* fallback 是渲染属性 */}
      <React.Suspense fallback={<p>Loading...</p>}>
        { user ? <Home /> : <Authentication /> }
      </React.Suspense>
    </div>
  );
}

export default App;
