import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import './App.css'

function App(props: any) {
  const user = props.user || { name: 'Guest' };

  return (
    <BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? '/product' : '/'}>
      <div className="App">
        <header style={{ padding: '20px', background: '#e0e0e0' }}>
          <h1>Product App (Sub Application)</h1>
          <p>Current User: <strong>{user.name}</strong></p>
          <nav>
             <Link to="/">List</Link> | <Link to="/detail">Detail</Link>
          </nav>
        </header>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<div><h2>Product List Page</h2><p>Here is a list of products.</p></div>} />
            <Route path="/detail" element={<div><h2>Product Detail Page</h2><p>Here is the detail of a product.</p></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
