import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.footer`
  padding: 3rem 0;
  background-color: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--light);
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const FooterText = styled.p`
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const FooterNav = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLink = styled(motion.a)`
  color: var(--light);
  font-size: 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const Copyright = styled.p`
  color: var(--gray);
  font-size: 0.8rem;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
};

const FooterItems = [
  { path: '/', label: 'Accueil' },
  { path: '/about', label: 'À propos' },
  { path: '/projects', label: 'Projets' },
  { path: '/contact', label: 'Contact' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SocialLinks>
            <SocialLink 
              href="https://github.com/wapin-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.2 }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </SocialLink>
            <SocialLink 
              href="https://www.linkedin.com/in/dorian-boyer-736003203/" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.2 }}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialLink>
          </SocialLinks>
          
          <FooterNav>
            {FooterItems.map((item, index) => (
              <FooterLink 
                key={item.path}
                href={item.path}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                {item.label}
            </FooterLink>  
            ))}
          </FooterNav>
          
          <FooterText variants={itemVariants}>
            Conçu et développé avec passion
          </FooterText>
          
          <Copyright variants={itemVariants}>
            {currentYear} BOYER Dorian. Tous droits réservés.
          </Copyright>
        </motion.div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
