import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <header style={{ background: '#333', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Micro Front Host</h1>
        <span>Admin User</span>
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '200px', background: '#f0f2f5', padding: '20px' }}>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>首页</Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/product" style={{ textDecoration: 'none', color: '#333' }}>商品管理 (子应用)</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main style={{ flex: 1, padding: '20px', position: 'relative' }}>
          {/* 主应用路由渲染出口 */}
          <Outlet />
          {/* 子应用挂载点 */}
          <div id="subapp-viewport"></div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
