import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaLogin from "./components/TelaLogin";
import Menu from "./components/Menu";
import OrdemVenda from "./components/OrdemVenda";
import NotaFiscal from "./components/NotaFiscal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/selection" element={<Menu />} />
        <Route path="/ordem-venda" element={<OrdemVenda />} />
        <Route path="/nota-fiscal" element={<NotaFiscal />} />
      </Routes>
    </Router>
  );
};

export default App;
