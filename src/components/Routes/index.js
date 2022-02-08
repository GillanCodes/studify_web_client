import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Home from '../Home';
import Navbar from '../Navbar';
import Sheet from '../Sheet';
import SheetsThread from '../SheetsThread';
import Profil from '../User/Profil';

export default function index() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route path="/auth" exact="true" element={<Auth />} />
            <Route path="/sheet/:id" exact="true" element={<Sheet />} />
            <Route path="/sheets/" exact="true" element={<SheetsThread />} />
            <Route path="/:username" exact="true" element={<Profil />} />
        </Routes>
      </BrowserRouter>
  );
}
