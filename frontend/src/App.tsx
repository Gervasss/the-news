import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login/loginPage';
import { AdminHome } from './pages/Admin/home/AdminHome';
import {VisaoGeral } from './pages/Admin/VisaoGeral/visaoGeral';

function App() {
  const [count, setCount] = useState(0)

  return (
<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/Visaogeral" element={<VisaoGeral />} />
      </Routes>
    </Router>
  )
}

export default App
