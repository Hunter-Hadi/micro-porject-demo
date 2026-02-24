import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerMicroApps, start } from 'qiankun';

// 注册子应用
registerMicroApps([
  {
    name: 'sub-react-product',
    entry: '//localhost:3001',
    container: '#subapp-viewport',
    activeRule: '/product',
    props: {
      user: {
        name: 'Admin User',
        role: 'admin',
      },
    },
  },
], {
  beforeLoad: [
    (app) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
  beforeMount: [
    (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
  afterUnmount: [
    (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
});

// 启动 qiankun
start();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
