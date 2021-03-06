import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Home from '../Home';
import Library from '../Library/Library';
import ColorPicker from '../Modules/ColorPicker';
import Navbar from '../Navbar';
import Sheet from '../Sheet';
import SheetsThread from '../Library/SheetsThread';
//import Profil from '../User/Profil';
import Profil from '../UserUpdate/Profil';
import QuizzThread from '../Library/QuizzThread';
import Quizz from '../Quizz/Quizz';
import QuizzResults from '../Quizz/Results/QuizzResults';
import About from '../static/About';
import Contact from '../static/Contact';
import CGU from '../static/CGU';
import Jobs from '../static/Jobs';
import Partners from '../static/Partners';

export default function index() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route path="/dev" exact="true" element={<ColorPicker />} />
            <Route path="/auth" exact="true" element={<Auth />} />
            <Route path="/library" exact="true" element={<Library />} />
            <Route path="/sheets/" exact="true" element={<SheetsThread />} />
            <Route path="/quizz/" exact="true" element={<QuizzThread />} />
            <Route path="/quizz/results" exact="true" element={<QuizzResults />} />
            <Route path="/quizz/:id" exact="true" element={<Quizz />} />
            <Route path="/sheet/:id" exact="true" element={<Sheet />} />
            <Route path="/:username" exact="true" element={<Profil />} />

            <Route path="/about" exact="true" element={<About />} />
            <Route path="/contact" exact="true" element={<Contact />} />
            <Route path="/cgu" exact="true" element={<CGU />} />
            <Route path="/jobs" exact="true" element={<Jobs />} />
            <Route path="/partners" exact="true" element={<Partners />} />

        </Routes>
      </BrowserRouter>
  );
}
