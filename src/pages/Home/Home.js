import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10%;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0 5%;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--light);
  font-size: 0.8rem;
  letter-spacing: 2px;
  
  .line {
    width: 1px;
    height: 50px;
    background-color: var(--light);
    margin-top: 10px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--primary);
      animation: scrollDown 1.5s ease-in-out infinite;
    }
  }
  
  @keyframes scrollDown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

const SmallText = styled(motion.p)`
  color: var(--primary);
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BigText = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubText = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 600;
  color: var(--gray);
  line-height: 1.1;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  max-width: 600px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--gray);
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: var(--primary);
    z-index: -1;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--dark);
    
    &::before {
      width: 100%;
    }
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  
  .shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(100, 255, 218, 0.05);
    backdrop-filter: blur(5px);
  }
`;

const SkillsSection = styled.section`
  padding: 8rem 0;
  background-color: rgba(10, 10, 10, 0.8);
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--light);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(15, 15, 15, 0.8);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.borderColor || '#61dafb'};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.iconColor || '#61dafb'};
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
`;

const Home = () => {
  const shapesRef = useRef(null);
  
  useEffect(() => {
    // Création des formes flottantes
    if (shapesRef.current) {
      const shapes = [];
      const container = shapesRef.current;
      
      // Nettoyer les formes existantes
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Créer 5 formes aléatoires
      for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        
        // Taille et position aléatoires
        const size = Math.random() * 300 + 50;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${posX}px`;
        shape.style.top = `${posY}px`;
        
        container.appendChild(shape);
        shapes.push(shape);
        
        // Animation avec GSAP
        gsap.to(shape, {
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }
    
    // Animation pour les éléments qui apparaissent au scroll
    gsap.utils.toArray('.reveal').forEach(section => {
      gsap.fromTo(section, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };
  
  const skillCardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };
  
  const heroData = {
    name: "BOYER DORIAN",
    title: "FULL STACK DEVELOPER",
    specialization: "Web & Mobile",
    description: "Agent spécialisé dans le développement web et mobile. Formation avancée à la faculté de Champagne-Ardenne et au GRETA. Actuellement en mission chez Expernet pour maîtriser la conception d'applications de nouvelle génération.",
    ctaText: "CONTACT",
    ctaLink: "/contact",
    githubLink: "https://github.com/devilghostg",
    linkedinLink: "https://www.linkedin.com/in/dorian-boyer-736003203/",
    profileImage: "/img/profilReu.jpeg"
  };

  const skillsData = [
    { name: "HTML5", icon: "fab fa-html5", color: "#E44D26" },
    { name: "CSS3", icon: "fab fa-css3-alt", color: "#264DE4" },
    { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
    { name: "React", icon: "fab fa-react", color: "#61DAFB" },
    { name: "PHP", icon: "fab fa-php", color: "#777BB3" },
    { name: "Python", icon: "fab fa-python", color: "#3776AB" },
    { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" },
    { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
  ];
  
  return (
    <HomeContainer>
      <HeroSection>
        <FloatingShapes ref={shapesRef} />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SmallText variants={itemVariants}>{heroData.specialization}</SmallText>
          <BigText variants={itemVariants}>{heroData.name}</BigText>
          <SubText variants={itemVariants}>{heroData.title}</SubText>
          <Description variants={itemVariants}>{heroData.description}</Description>
          
          <motion.div variants={itemVariants}>
            <Link to={heroData.ctaLink} style={{ textDecoration: 'none' }}>
              <CTAButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {heroData.ctaText}
              </CTAButton>
            </Link>
          </motion.div>
        </motion.div>
        
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>SCROLL</span>
          <div className="line"></div>
        </ScrollIndicator>
      </HeroSection>
      
      <SkillsSection>
        <div className="container">
          <SectionTitle
            className="reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Mes Compétences
          </SectionTitle>
          
          <SkillsContainer>
            {skillsData.map((skill, index) => (
              <SkillCard
                key={index}
                className="reveal"
                variants={skillCardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2 }}
                borderColor={skill.color}
                iconColor={skill.color}
              >
                <i className={skill.icon + " icon"}></i>
                <h3>{skill.name}</h3>
              </SkillCard>
            ))}
          </SkillsContainer>
        </div>
      </SkillsSection>
    </HomeContainer>
  );
};

export default Home;
