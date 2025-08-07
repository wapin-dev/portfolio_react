import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ProjectsContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow-x: hidden;
`;

const ProjectsHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: var(--primary);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionDescription = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray);
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem 0;
`;

const FilterButton = styled(motion.button)`
  background: transparent;
  border: 1px solid ${props => props.active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--light)'};
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const ProjectsGrid = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  background: rgba(15, 15, 15, 0.7);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    .project-image img {
      transform: scale(1.05);
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
  opacity: 0.7;
  transition: opacity 0.3s ease;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
  background: rgba(15, 15, 15, 0.95);
  height: calc(100% - 250px);
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--light);
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProjectTag = styled.span`
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--gray);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--light);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
  
  i {
    font-size: 1.2rem;
  }
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Exemple de projets
  const projects = [
    {
        id: 1,
        title: "MonViso",
        category: ["Web","Mobile"],
        image: "/img/monviso-logo.webp", // à remplacer par l'image réelle si différente
        description: "Application de gestion budgétaire personnelle permettant de suivre les dépenses, gérer les revenus et planifier un budget via une interface intuitive et une API sécurisée. (alpha)",
        tags: ["Python", "Django", "Django REST", "MySQL", "JWT", "Celery", "Redis", "Bootstrap", "PWA"],
        github: "https://github.com/devilghostg/monviso", // à modifier si besoin
        demo: "https://mon-viso.fr/home/" // ou lien vers la démo/render si dispo
    },
    {
        id: 2,
        title: "Prevformation",
        category: "Web",
        image: "/img/logo_prevformation.png", // à remplacer par l'image réelle si tu en as une
        description: "Plateforme web de gestion de formations et de stagiaires permettant de gérer les utilisateurs, sessions et inscriptions avec une interface d'administration complète.",
        tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
        github: "https://github.com/devilghostg/prevformation", // à modifier si besoin
        demo: "https://prevformation.re/" // ou lien vers la démo si disponible
    },
    {
        id: 3,
        title: "Donuts 3D",
        category: "Web",
        image: "/img/donuts.png", // à remplacer par l'image réelle du site
        description: "Site interactif présentant des donuts en 3D avec animations réalisées grâce à Three.js. Développement front-end en HTML et CSS pour une expérience visuelle immersive. (fictif)",
        tags: ["HTML5", "CSS3", "JavaScript", "Three.js"],
        github: "https://github.com/devilghostg/donuts-3d", // à modifier si besoin
        demo: "/page/donuts/donuts.html" // ou lien vers la démo si disponible
    },
    {
        id: 4,
        title: "Slup-Dev.fr",
        category: "Web",
        image: "/img/logo.png", // à remplacer par l'image réelle
        description: "Site web personnel pour présenter Slup-Dev, mettant en avant mes projets, services et compétences en développement web avec un design moderne et responsive.",
        tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "Portfolio"],
        github: "https://github.com/devilghostg/slup-dev-fr", // à modifier si besoin
        demo: "https://slup-dev.fr"
      }
  ];
  
  // Filtres disponibles
  const filters = [
    { id: 'all', name: 'Tous' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' }
  ];
  
  // Filtrer les projets en fonction du filtre actif
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => {
        // Vérifier si category est un tableau ou une chaîne de caractères
        if (Array.isArray(project.category)) {
          // Si c'est un tableau, vérifier si l'une des catégories correspond au filtre actif
          return project.category.some(cat => cat.toLowerCase() === activeFilter);
        } else {
          // Si c'est une chaîne, vérifier si elle correspond au filtre actif
          return project.category.toLowerCase() === activeFilter;
        }
      });
      setFilteredProjects(filtered);
    }
  }, [activeFilter]);
  
  // Animations au scroll
  useEffect(() => {
    // Animation pour les cartes de projet
    const cards = gsap.utils.toArray('.project-card');
    
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
    
    // Nettoyage des animations lors du démontage du composant
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Exécuter une seule fois au montage du composant
  
  // Variants pour les animations Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <ProjectsContainer>
      <ProjectsHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Mes Projets</SectionTitle>
          <SectionDescription>
            Découvrez une sélection de mes projets récents. Chaque projet est unique et reflète
            ma passion pour la création d'expériences web.
          </SectionDescription>
        </motion.div>
        
        <FilterContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.name}
            </FilterButton>
          ))}
        </FilterContainer>
      </ProjectsHeader>
      
      <AnimatePresence mode="wait">
        <ProjectsGrid
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              className="project-card"
              variants={cardVariants}
              layoutId={`project-${project.id}`}
            >
              <ProjectImage className="project-image">
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectOverlay className="overlay" />
              <ProjectContent className="project-content">
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLinks>
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                    {/* <i className="fab fa-github"></i> Code */}
                  </ProjectLink>
                  <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i> Demo
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects;
