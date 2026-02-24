import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let root: ReactDOM.Root | null = null;

function render(props: any) {
  const { container } = props;
  root = ReactDOM.createRoot(
    container ? container.querySelector('#root') : document.getElementById('root')
  );
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
}

renderWithQiankun({
  mount(props) {
    console.log('[sub-react-product] mount', props);
    render(props);
  },
  bootstrap() {
    console.log('[sub-react-product] bootstrap');
  },
  unmount(props) {
    console.log('[sub-react-product] unmount', props);
    root?.unmount();
  },
  update(props) {
    console.log('[sub-react-product] update', props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
