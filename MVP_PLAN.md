# 微前端项目 MVP 开发方案文档

## 1. 项目概述
本项目旨在构建一个基于 **qiankun** 的微前端 Demo，用于学习微前端架构的核心概念、掌握常见问题的解决方案（如样式隔离、通信、状态管理）。

- **目标**：从零搭建一套主从架构的微前端环境，并实现一个最简业务闭环。
- **核心框架**：`qiankun` (业界主流)
- **子应用技术栈**：React + Vite (当前最易上手且高效的组合)

## 2. 技术选型与架构

### 2.1 整体架构
采用 **基座（Host） + 子应用（Micro App）** 模式。

| 角色 | 项目名称 | 技术栈 | 端口 | 职责 |
| :--- | :--- | :--- | :--- | :--- |
| **基座 (Host)** | `main-app` | React 18 + Vite + React Router + **qiankun** | `3000` | 全局布局、菜单导航、登录状态管理、子应用加载与调度 |
| **子应用 (Sub)** | `sub-react-product` | React 18 + Vite | `3001` | 商品管理模块（列表展示），独立路由，支持独立运行 |

> **选择理由**：
> - **qiankun**：基于 single-spa 封装，开箱即用，文档完善，适合初学者和生产环境。
> - **React + Vite**：开发体验极佳，构建速度快。虽然 qiankun 对 Webpack 支持更原生，但配合 `vite-plugin-qiankun` 可以很好地解决 Vite 的 ESM 模块加载问题，这也是目前非常流行的现代化微前端实践。

### 2.2 目录结构规划
```text
f:\Code\RN\micro-front\
├── main-app/                # 基座应用
│   ├── src/
│   │   ├── micro-app.ts     # qiankun 注册配置
│   │   └── ...
├── sub-react-product/       # 子应用：商品管理
│   ├── src/
│   │   ├── main.tsx         # 导出生命周期 (mount, bootstrap, unmount)
│   │   └── ...
│   └── vite.config.ts       # 配置 vite-plugin-qiankun
└── docs/                    # 项目文档
```

## 3. MVP 功能清单

### 3.1 基座 (Main App)
1.  **布局框架**：包含顶部 Header 和左侧 Menu。
2.  **子应用注册**：配置 `qiankun` 的 `registerMicroApps`，注册商品子应用。
3.  **默认路由**：访问 `/` 显示欢迎页，访问 `/product/*` 加载子应用。
4.  **全局状态**：演示下发简单的 `user` 信息（如用户名）给子应用。

### 3.2 子应用 (Product App)
1.  **生命周期改造**：实现 `bootstrap`, `mount`, `unmount` 钩子。
2.  **独立运行支持**：在非微前端环境下（直接访问 3001 端口）也能正常运行。
3.  **业务页面**：一个简单的“商品列表”页面。
4.  **接收通信**：展示从基座传递过来的 `user` 信息。

## 4. 常见微前端问题处理（MVP 阶段包含）
在开发过程中，我们将重点解决并演示以下问题：
1.  **静态资源路径问题**：解决子应用在基座中运行时，图片/JS 404 的问题（Public Path 配置）。
2.  **样式隔离**：演示 CSS Module 或简单的样式冲突场景及解决方案。
3.  **Vite 适配**：解决 Vite 开发模式下 ESM 与 qiankun 沙箱的兼容性问题。

## 5. 开发步骤规划

### 第一阶段：工程初始化
1.  创建 `main-app` 和 `sub-react-product` 项目。
2.  安装核心依赖 (`qiankun`, `vite-plugin-qiankun`, `react-router-dom`)。

### 第二阶段：基座开发
1.  搭建基座布局。
2.  配置 `registerMicroApps` 和 `start`。

### 第三阶段：子应用接入
1.  配置 `vite-plugin-qiankun`。
2.  改造入口文件 `main.tsx`，导出生命周期。
3.  配置路由 base，确保在独立运行和集成运行时都能匹配。

### 第四阶段：联调与验证
1.  同时启动两个服务。
2.  验证路由跳转、资源加载、状态显示。

## 6. 确认与执行
请确认以上方案。确认无误后，我将开始执行**第一阶段：工程初始化**。
