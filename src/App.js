import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages (à créer plus tard)
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

// Components (à créer plus tard)
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

// Composant pour gérer les transitions de page
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    // Animation pour le chargement initial
    const tl = gsap.timeline();
    
    tl.to('.loader', {
      height: '0%',
      duration: 1.5,
      ease: 'power4.inOut',
      onComplete: () => {
        document.querySelector('.loader').style.display = 'none';
      }
    });
    
    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    // Appliquer l'observer à tous les éléments avec la classe 'hidden'
    document.querySelectorAll('.hidden').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      // Nettoyer l'observer lors du démontage du composant
      document.querySelectorAll('.hidden').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <Router>
      {/* Loader d'animation */}
      <div className="loader" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        zIndex: 9999
      }}></div>
      
      {/* Curseur personnalisé */}
      <Cursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Contenu principal avec transitions */}
      <AnimatedRoutes />
      
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
