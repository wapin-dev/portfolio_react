import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CursorDot = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 8px;
  height: 8px;
  background-color: var(--primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorCircle = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(100, 255, 218, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
`;

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    // Fonction pour suivre la position de la souris
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', mouseMove);
    
    // Détection des éléments cliquables pour changer l'état du curseur
    const handleMouseOver = () => setCursorVariant('hover');
    const handleMouseOut = () => setCursorVariant('default');
    
    // Ajouter les événements aux éléments cliquables
    const addEventListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      clickables.forEach(el => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('mouseout', handleMouseOut);
      });
    };
    
    // Appeler une première fois pour les éléments existants
    addEventListeners();
    
    // Observer pour détecter les nouveaux éléments cliquables
    const observer = new MutationObserver(addEventListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      observer.disconnect();
      
      // Nettoyer les événements
      const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      clickables.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);
  
  // Variantes d'animation pour le point central du curseur
  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 20
      }
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1.5,
      transition: {
        type: 'spring',
        mass: 0.1,
        stiffness: 800,
        damping: 20
      }
    }
  };
  
  // Variantes d'animation pour le cercle extérieur du curseur
  const circleVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      transition: {
        type: 'spring',
        mass: 0.6,
        stiffness: 200,
        damping: 20,
        delay: 0.03
      }
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      transition: {
        type: 'spring',
        mass: 0.6,
        stiffness: 200,
        damping: 20,
        delay: 0.03
      }
    }
  };
  
  return (
    <>
      <CursorDot
        variants={variants}
        animate={cursorVariant}
      />
      <CursorCircle
        variants={circleVariants}
        animate={cursorVariant}
      />
    </>
  );
};

export default Cursor;
