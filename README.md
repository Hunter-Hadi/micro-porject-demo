# Micro Frontend Demo Project

这是一个基于 **qiankun + React + Vite** 的微前端学习 Demo 项目。

## 🏗 项目结构

```text
f:\Code\RN\micro-front\
├── main-app/                # 基座应用 (Host) - React + Vite + qiankun
│   ├── src/
│   │   ├── micro-app.ts     # 子应用注册配置
│   │   └── main.tsx         # qiankun 启动入口
├── sub-react-product/       # 子应用 (Sub App) - React + Vite + vite-plugin-qiankun
│   ├── src/
│   │   ├── main.tsx         # 导出 mount/bootstrap/unmount 生命周期
│   │   └── App.tsx          # 路由配置 (basename 处理)
│   └── vite.config.ts       # vite-plugin-qiankun 插件配置
└── docs/                    # 学习文档
```

## 🚀 快速开始

### 1. 安装依赖

请分别进入两个项目目录安装依赖：

```bash
# 基座
cd main-app
npm install

# 子应用
cd sub-react-product
npm install
```

### 2. 启动项目

你需要同时启动两个服务（建议在两个终端窗口中分别运行）：

```bash
# 终端 1：启动基座 (运行在 3000 端口)
cd main-app
npm run dev

# 终端 2：启动子应用 (运行在 3001 端口)
cd sub-react-product
npm run dev
```

### 3. 访问验证

打开浏览器访问基座：[http://localhost:3000](http://localhost:3000)

- 点击导航栏中的 **"商品管理 (子应用)"**。
- 你应该能看到子应用被加载，并且页面上显示 "Product App (Sub Application)"。
- 此时 URL 变为 `http://localhost:3000/product`。
- 你也可以直接访问子应用独立运行地址：[http://localhost:3001](http://localhost:3001)。

## 📚 学习指南

关于微前端的原理、常见问题及解决思路，请阅读详细文档：
👉 [微前端学习指南 (docs/LEARNING.md)](./docs/LEARNING.md)

## 🛠 技术栈

- **Core**: [qiankun](https://qiankun.umijs.org/)
- **Host**: React 18, Vite, React Router v6
- **Sub App**: React 18, Vite, vite-plugin-qiankun
