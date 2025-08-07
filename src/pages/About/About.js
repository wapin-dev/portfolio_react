import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 100px;
  overflow-x: hidden;
`;

const AboutSection = styled.section`
  padding: 5rem 0;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    border: 2px solid var(--primary);
    border-radius: 10px;
    z-index: -1;
    transition: all 0.3s ease;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    filter: grayscale(20%);
    transition: all 0.3s ease;
  }
  
  &:hover {
    &::before {
      top: 15px;
      left: 15px;
    }
    
    img {
      filter: grayscale(0%);
    }
  }
  
  @media (max-width: 992px) {
    height: 400px;
  }
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--primary);
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray);
  margin-bottom: 2rem;
`;

const ExperienceSection = styled.section`
  padding: 5rem 0;
  background-color: rgba(10, 10, 10, 0.8);
`;

const ExperienceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ExperienceTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
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

const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  background: rgba(15, 15, 15, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: var(--primary);
    opacity: 0.7;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const TimelineDot = styled.div`
  display: none;
`;

const TimelineContent = styled.div`
  padding-left: 1rem;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  
  h4 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    
    &::before {
      content: '@ ';
      margin-right: 0.25rem;
      opacity: 0.8;
    }
  }
  
  p {
    font-size: 0.95rem;
    color: var(--gray);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--gray);
      
      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: var(--primary);
        opacity: 0.8;
      }
    }
  }
`;

const TimelineDate = styled.div`
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: inline-block;
`;

const About = () => {
  useEffect(() => {
    const timelineItems = gsap.utils.toArray('.timeline-item');
    
    gsap.set(timelineItems, { opacity: 0, y: 50 });
    
    ScrollTrigger.batch(timelineItems, {
      onEnter: batch => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });
    
    timelineItems.forEach(item => {
      const highlight = gsap.timeline({ paused: true });
      highlight.to(item.querySelector('h3'), { 
        color: 'var(--primary)', 
        duration: 0.3,
        ease: 'power2.out'
      });
      
      item.addEventListener('mouseenter', () => highlight.play());
      item.addEventListener('mouseleave', () => highlight.reverse());
    });
  }, []);
  
  const aboutData = {
    name: "DORIAN.BOYER",
    status: "ONLINE",
    class: "Web Developer",
    level: "Full Stack",
    bio: [
      {
        title: "[MISSION OBJECTIVE]",
        content: "Explorer du monde numérique, je suis un développeur passionné par les nouvelles technologies. Ma quête : créer des expériences web innovantes et performantes."
      },
      {
        title: "[SPECIALIZATION]",
        content: "Maîtrise des technologies web modernes, création d'interfaces immersives, optimisation des performances. Toujours en recherche de nouveaux défis techniques à relever."
      }
    ],
    profileImage: "/img/roadtrip.jpeg"
  };

  const experienceData = [
    {
      company: "NOULOUTOU",
      position: "Concepteur Développeur d'Applications en alternance",
      period: "2024 - 2025",
      description: "Plateforme de location entre particuliers à La Réunion",
      tasks: [
        "Conception et développement de nouvelles fonctionnalités",
        "Architecture et optimisation des applications",
        "Développement Full Stack (Python, Django, MySQL)",
        "Participation aux choix techniques et à l'évolution de la plateforme"
      ]
    },
    {
    company: "Prevformation",
    position: "Concepteur Développeur d'Applications",
    period: "2024",
    description: "Plateforme web de gestion des formations et des stagiaires",
    tasks: [
        "Développement d’une application web de gestion des centres de formation",
        "Création d’une interface d’administration pour la gestion des utilisateurs, sessions et inscriptions",
        "Conception de la base de données et intégration avec MySQL",
        "Développement back-end en PHP avec une architecture modulaire"
    ]
    },
    {
        company: "Arden Equipment",
        position: "Stagiaire Développeur Web",
        period: "2023",
        description: "Refonte et amélioration de sites web pour un fabricant d’équipements industriels",
        tasks: [
          "Refonte complète du site vitrine en remplaçant une solution WordPress par un développement sur mesure",
          "Conception et développement d’une interface moderne et responsive (HTML, CSS, JavaScript)",
          "Mise en place de nouvelles fonctionnalités interactives : formulaire de contact avancé, carte interactive, gestion de catalogue produits",
          "Optimisation des performances et de l’accessibilité du site",
          "Collaboration avec les équipes internes pour intégrer les besoins métier et les contenus multilingues"
        ]
      },
    {
      company: "E.Leclerc",
      position: "Expérience en boulangerie",
      period: "2022",
      description: "Travail d'équipe et service client"
    },
    {
      company: "Papernest",
      position: "Conseiller commercial",
      period: "2022",
      description: "Gestion de la relation client et des dossiers administratifs"
    },
    {
      company: "Université de Reims",
      position: "Licence Informatique",
      period: "2021-2022",
      description: "Formation en développement et programmation"
    },
    {
      company: "Boulangerie Yong",
      position: "Stage en maintenance industrielle",
      period: "2019-2020",
      description: "Gestion et maintenance des équipements"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };
  
  return (
    <AboutContainer>
      <AboutSection>
        <AboutContent>
          <AboutImage
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img src={process.env.PUBLIC_URL + aboutData.profileImage} alt={aboutData.name} />
          </AboutImage>
          
          <AboutInfo>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionTitle variants={itemVariants}>{aboutData.name}</SectionTitle>
              
              <AboutText variants={itemVariants}>
                {aboutData.bio[0].content}
              </AboutText>
              
              <AboutText variants={itemVariants}>
                {aboutData.bio[1].content}
              </AboutText>
            </motion.div>
          </AboutInfo>
        </AboutContent>
      </AboutSection>
      
      <ExperienceSection>
        <ExperienceContent>
          <ExperienceTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Mon Parcours Professionnel
          </ExperienceTitle>
          
          <Timeline>
            {experienceData.map((exp, index) => (
              <TimelineItem 
                key={index} 
                className="timeline-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TimelineContent className="content">
                  <TimelineDate className="date">{exp.period}</TimelineDate>
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                  {exp.tasks && (
                    <ul>
                      {exp.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ExperienceContent>
      </ExperienceSection>
    </AboutContainer>
  );
};

export default About;
