# 微前端学习指南 (Learning Guide)

微前端 (Micro Frontend) 是一种将前端应用分解为多个更小、更独立的应用的架构模式。类似于后端的微服务。

---

## 🔍 原理 (How it works)

本 Demo 基于 **qiankun** 框架实现，其核心原理如下：

### 1. 应用加载 (Loader)
基座应用 (Host) 通过 `fetch` 请求子应用的 HTML 入口文件，解析其中的 `<script>` 和 `<link>` 标签，然后动态执行 JS 并挂载到指定的 DOM 节点中。
> 💡 **Tip**: 这就是为什么我们在 `vite.config.ts` 中配置 `cors: true` 的原因，因为基座需要跨域请求子应用的资源。

### 2. JS 沙箱 (Sandbox)
为了防止子应用的全局变量污染 window (例如 `window.myVar = 1`)，qiankun 提供了 JS 沙箱机制。
- **ProxySandbox**: 使用 ES6 Proxy 代理 window 对象，记录子应用的修改，卸载时还原。
- **SnapshotSandbox**: (不支持 Proxy 的环境) 激活时快照 window，卸载时恢复快照。

### 3. 样式隔离 (Style Isolation)
- **Shadow DOM**: 开启严格隔离，子应用被包裹在 Shadow DOM 中。
- **Scoped CSS**: 实验性功能，类似于 Vue 的 scoped，给 CSS 选择器增加前缀。
> ⚠️ **注意**: 本 Demo 使用 Vite，样式隔离需要特别注意，因为 Vite 开发模式下样式注入方式与 Webpack 不同。

---

## 🛠 常见问题与解决 (Troubleshooting)

### Q1: 子应用加载失败，控制台报错 "Application died in status LOADING_SOURCE_CODE: You need to export lifecycle functions..."
**原因**: 子应用没有正确导出 `bootstrap`, `mount`, `unmount` 生命周期钩子。
**解决**:
1. 检查子应用入口文件 (`main.tsx`) 是否导出了这些函数。
2. 如果是 Vite 项目，必须使用 `vite-plugin-qiankun` 插件，并按照插件文档修改入口文件。

### Q2: 子应用静态资源 (图片/字体) 404
**原因**: 子应用的资源路径是相对路径，加载时是基于基座的域名 (`localhost:3000`) 请求的，而不是子应用自己的域名 (`localhost:3001`)。
**解决**: 配置 Public Path。
- **Webpack**: 配置 `__webpack_public_path__`。
- **Vite**: 在 `vite.config.ts` 中设置 `base`，或者使用 `vite-plugin-qiankun` 处理。

### Q3: 路由 404 问题
**原因**: 刷新页面时，如果当前路由是子应用路由 (e.g. `/product/list`)，Nginx 或 DevServer 不知道如何处理。
**解决**:
- **基座**: 确保基座路由配置了通配符 (e.g. `path="product/*"`)。
- **子应用**: 设置 `basename`。在独立运行时 basename 为 `/`，在基座中运行时 basename 为 `/product`。
```typescript
<BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? '/product' : '/'}>
```

---

## 🎓 学习路径建议

1. **基础阶段**:
   - 跑通本 Demo，理解 `registerMicroApps` 和 `start` 的作用。
   - 尝试修改子应用的代码，观察基座的变化。
   - 打开控制台 Network 面板，观察基座是如何加载子应用的 JS/CSS 文件的。

2. **进阶阶段**:
   - **通信**: 尝试使用 `initGlobalState` 实现基座与子应用的双向通信（如：基座修改语言，子应用同步切换）。
   - **样式隔离**: 尝试在子应用写一个全局 CSS `body { color: red; }`，看是否会影响基座，思考如何解决。
   - **多技术栈**: 尝试添加一个 Vue3 的子应用。

3. **源码阅读**:
   - 阅读 `qiankun` 源码，重点看 `import-html-entry` (HTML 解析) 和 `sandbox` (沙箱实现)。

## 📚 推荐资源

- [qiankun 官方文档](https://qiankun.umijs.org/zh)
- [Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)
- [Single-SPA](https://single-spa.js.org/) (qiankun 的底层依赖)
