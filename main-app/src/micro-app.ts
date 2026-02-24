export const microApps = [
  {
    name: 'sub-react-product', // 唯一ID
    entry: '//localhost:3001', // 子应用入口
    container: '#subapp-viewport', // 挂载点
    activeRule: '/product', // 激活路由
    props: {
      user: {
        name: 'Admin User',
        role: 'admin',
      }, // 下发的数据
    },
  },
];

export const lifeCycles = {
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
};
