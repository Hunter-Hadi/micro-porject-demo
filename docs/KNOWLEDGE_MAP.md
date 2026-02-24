# 微前端核心知识点与代码映射 (Knowledge Map)

本文档将微前端的核心概念与本项目中的具体代码实现进行一一映射，帮助你快速理解原理。

---

## 1. 应用注册 (Registration)

**概念**: 基座应用需要知道有哪些子应用，以及何时加载它们。
**关键点**:
- `name`: 子应用唯一标识。
- `entry`: 子应用的入口地址 (HTML)。
- `container`: 子应用挂载的 DOM 节点 ID。
- `activeRule`: 激活规则 (通常是路由匹配)。

**📝 代码映射**:
- **基座注册**: [main-app/src/main.tsx:L8-L20](file:///f:/Code/RN/micro-front/main-app/src/main.tsx#L8-L20)
  ```typescript
  registerMicroApps([
    {
      name: 'sub-react-product',
      entry: '//localhost:3001',
      container: '#subapp-viewport',
      activeRule: '/product',
      // ...
    },
  ]);
  ```
- **基座启动**: [main-app/src/main.tsx:L43](file:///f:/Code/RN/micro-front/main-app/src/main.tsx#L43)
  ```typescript
  start();
  ```

---

## 2. 生命周期 (Life Cycle)

**概念**: 微前端框架通过调用子应用导出的生命周期函数来控制子应用的加载、渲染和卸载。
**关键点**:
- `bootstrap`: 初始化 (只调用一次)。
- `mount`: 挂载 (每次进入子应用调用)。
- `unmount`: 卸载 (每次离开子应用调用)。

**📝 代码映射**:
- **子应用导出**: [sub-react-product/src/main.tsx:L21-L36](file:///f:/Code/RN/micro-front/sub-react-product/src/main.tsx#L21-L36)
  ```typescript
  renderWithQiankun({
    mount(props) {
      render(props); // 渲染 React 应用
    },
    bootstrap() { ... },
    unmount(props) {
      root?.unmount(); // 卸载 React 应用
    },
  });
  ```
- **独立运行判断**: [sub-react-product/src/main.tsx:L38-L40](file:///f:/Code/RN/micro-front/sub-react-product/src/main.tsx#L38-L40)
  ```typescript
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({});
  }
  ```

---

## 3. 路由策略 (Routing Strategy)

**概念**: 基座和子应用都有自己的路由系统，需要协同工作。
**关键点**:
- **Host**: 负责顶层路由，匹配到子应用前缀时，加载子应用。
- **Sub**: 需要设置 `basename`，以便在基座的路由下正确工作。

**📝 代码映射**:
- **基座路由占位**: [main-app/src/App.tsx:L13](file:///f:/Code/RN/micro-front/main-app/src/App.tsx#L13)
  ```typescript
  <Route path="product/*" element={null} />
  ```
- **子应用 Basename**: [sub-react-product/src/App.tsx:L9](file:///f:/Code/RN/micro-front/sub-react-product/src/App.tsx#L9)
  ```typescript
  // 如果在 qiankun 中运行，basename 为 '/product'，否则为 '/'
  <BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? '/product' : '/'}>
  ```

---

## 4. 应用通信 (Communication)

**概念**: 基座与子应用之间的数据传递。
**关键点**:
- **Props**: 最简单的单向通信，基座通过 `props` 下发数据，子应用在 `mount` 生命周期或组件中接收。

**📝 代码映射**:
- **基座下发**: [main-app/src/main.tsx:L14-L19](file:///f:/Code/RN/micro-front/main-app/src/main.tsx#L14-L19)
  ```typescript
  props: {
    user: { name: 'Admin User', role: 'admin' },
  },
  ```
- **子应用接收**: [sub-react-product/src/App.tsx:L6](file:///f:/Code/RN/micro-front/sub-react-product/src/App.tsx#L6)
  ```typescript
  function App(props: any) {
    const user = props.user || { name: 'Guest' };
    // ...
  }
  ```

---

## 5. 资源加载与跨域 (Resource Loading & CORS)

**概念**: 基座是通过 AJAX (fetch) 请求子应用的 HTML 和 JS/CSS 的，因此子应用必须支持跨域访问。
**关键点**:
- **CORS**: 子应用服务器必须开启跨域资源共享。
- **Public Path**: 子应用的资源路径需要是绝对路径，否则在基座下会 404 (Vite 开发环境下 `vite-plugin-qiankun` 帮我们处理了部分，但生产环境仍需注意)。

**📝 代码映射**:
- **CORS 配置**: [sub-react-product/vite.config.ts:L13-L17](file:///f:/Code/RN/micro-front/sub-react-product/vite.config.ts#L13-L17)
  ```typescript
  server: {
    port: 3001,
    cors: true, // 允许跨域
    origin: 'http://localhost:3001'
  }
  ```
- **Vite 插件支持**: [sub-react-product/vite.config.ts:L9](file:///f:/Code/RN/micro-front/sub-react-product/vite.config.ts#L9)
  ```typescript
  qiankun('sub-react-product', { useDevMode: true })
  ```
