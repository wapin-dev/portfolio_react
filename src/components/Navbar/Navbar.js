import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 1rem 3rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
    
    &.scrolled {
      padding: 1rem 1.5rem;
    }
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--light);
  
  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  span {
    color: var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.div)`
  position: relative;
  
  a {
    color: var(--light);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary);
    }
    
    &.active {
      color: var(--primary);
    }
  }
`;

const NavIndicator = styled(motion.div)`
  position: absolute;
  bottom: -5px;
  left: 0;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
`;

const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
  }
`;

const MenuLine = styled(motion.div)`
  width: 100%;
  height: 2px;
  background-color: var(--light);
  transition: all 0.3s ease;
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: rgba(15, 15, 15, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 100;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
  }
`;

// Variantes d'animation pour le menu mobile
const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Variantes d'animation pour les éléments du menu
const menuItemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Éléments de navigation
  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/projects', label: 'Projets' },
    { path: '/contact', label: 'Contact' }
  ];
  
  return (
    <NavContainer className={scrolled ? 'scrolled' : ''}>
      <Logo
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link to="/">
          Port<span>folio</span>
        </Link>
      </Logo>
      
      <NavLinks>
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
              {item.label}
            </Link>
            {location.pathname === item.path && (
              <NavIndicator layoutId="navIndicator" />
            )}
          </NavLink>
        ))}
      </NavLinks>
      
      <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <MenuLine animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} />
        <MenuLine animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
        <MenuLine animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} />
      </MobileMenuButton>
      
      <MobileMenu
        variants={menuVariants}
        initial="closed"
        animate={mobileMenuOpen ? 'open' : 'closed'}
      >
        {navItems.map((item) => (
          <motion.div key={item.path} variants={menuItemVariants}>
            <Link 
              to={item.path} 
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: location.pathname === item.path ? 'var(--primary)' : 'var(--light)',
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontWeight: '500'
              }}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </MobileMenu>
    </NavContainer>
  );
};

export default Navbar;
