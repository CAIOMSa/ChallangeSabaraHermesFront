import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LotePage from '../estoque/LotePage';
import ProdutoPage from "../estoque/ProdutoPage";
import TelaConfirmacao from '../administrativo/TelaConfirmacao';
import TelaAgenda from '../administrativo/TelaAgenda';
import TelaCadastro from '../administrativo/TelaCadastro';
import TelaAdministrativo from '../administrativo/TelaAdministrativo';
import Artificial from '../hermes/Artificial'

import Login from '../login/Login';



export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/confirmacao" element={<TelaConfirmacao />} />
    <Route path="/agenda" element={<TelaAgenda />} />
    <Route path="/administrativo" element={<TelaAdministrativo />} />
    <Route path="/estoque/lote" element={<LotePage />} />
    <Route path="/estoque/produto" element={<ProdutoPage />} />
    <Route path="/artificial" element={<Artificial />} />
  </Routes>
);
