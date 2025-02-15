import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login/loginPage';
import { AdminHome } from './pages/Admin/home/AdminHome';
import {VisaoGeral } from './pages/Admin/VisaoGeral/visaoGeral';
import { Ranking } from './pages/Admin/Ranking/ranking';
import { Estatisticas } from './pages/Admin/Estatisticas/estatisticas';
import { Engajamento } from './pages/Admin/Engajamento/engajamento';
import { Leitores } from './pages/leitores/leitoresPage';

function App() {
  const [count, setCount] = useState(0)

  return (
<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/Visaogeral" element={<VisaoGeral />} />
        <Route path="/admin/Ranking" element={<Ranking />} />
        <Route path="/admin/Estatistica" element={<Estatisticas />} />
        <Route path="/admin/Engajamento" element={<Engajamento />} />
        <Route path="/Leitores" element={<Leitores />} />
      </Routes>
    </Router>
  )
}

export default App
