import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLink, faCalendarAlt, faCode, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProjectDetailContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 120px 0 80px;
`;

const ProjectContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--light);
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

const ProjectTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: var(--gray);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ProjectTag = styled.span`
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  
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

const ProjectDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray);
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.primary ? '#111' : 'var(--light)'};
  border: 1px solid ${props => props.primary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 10px 20px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? 'transparent' : 'rgba(100, 255, 218, 0.1)'};
    color: var(--primary);
    border-color: var(--primary);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 5rem 0;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--gray);
    margin-bottom: 2rem;
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Exemple de projets (à remplacer par vos données réelles ou un appel API)
  const projects = [
    {
        id: 1,
        title: "MonViso",
        category: ["Web","Mobile"],
        image: "/img/monviso-logo.webp",
        description: "Application de gestion budgétaire personnelle permettant de suivre les dépenses, gérer les revenus et planifier un budget via une interface intuitive et une API sécurisée. (alpha)",
        longDescription: [
          "MonViso est une application de gestion budgétaire personnelle que j'ai développée pour aider les utilisateurs à mieux gérer leurs finances. L'application offre une interface intuitive pour suivre les dépenses, gérer les revenus et planifier un budget.",
          "Le projet utilise Django et Django REST Framework pour le backend, avec une base de données MySQL pour stocker les données des utilisateurs de manière sécurisée. L'authentification est gérée via JWT pour assurer la sécurité des connexions.",
          "J'ai également implémenté Celery et Redis pour gérer les tâches asynchrones comme l'envoi d'emails et les notifications. Le frontend utilise Bootstrap pour un design responsive et moderne."
        ],
        challenges: "L'un des plus grands défis de ce projet a été de concevoir une architecture sécurisée pour les données financières sensibles. J'ai dû mettre en place un système robuste d'authentification et d'autorisation, ainsi qu'une gestion efficace des sessions utilisateur.",
        solution: "J'ai opté pour une architecture API REST avec Django, ce qui m'a permis de séparer clairement le frontend du backend. L'utilisation de JWT pour l'authentification a résolu les problèmes de sécurité, tandis que l'implémentation de Celery a permis d'optimiser les performances pour les tâches lourdes.",
        features: [
          "Suivi des dépenses et revenus",
          "Catégorisation automatique des transactions",
          "Visualisation des données financières avec des graphiques",
          "Planification budgétaire",
          "Notifications et alertes personnalisables",
          "Mode hors ligne avec synchronisation"
        ],
        date: "2025",
        status: "Alpha",
        tags: ["Python", "Django", "Django REST", "MySQL", "JWT", "Celery", "Redis", "Bootstrap", "PWA"],
        github: "https://github.com/devilghostg/monviso",
        demo: "https://mon-viso.fr/home/"
    },
    {
        id: 2,
        title: "Prevformation",
        category: ["Web", "PHP", "Gestion de formation"],
        image: "/img/logo_prevformation.png",
        description: "Site vitrine proposant des formations avec une partie administration où le formateur peut scanner un QR code pour faire apparaître un formulaire à remplir par les participants.",
        longDescription: [
            "Prevformation est un site vitrine destiné à présenter des formations proposées par un centre de formation.",
            "Le site intègre une partie administration dédiée aux formateurs, leur permettant de scanner un QR code lors des sessions afin de faire apparaître un formulaire numérique pour que les participants puissent le remplir directement.",
            "Cette fonctionnalité facilite la collecte des données et le suivi des sessions de formation.",
            "Le site allie présentation claire des offres de formation et outils pratiques pour la gestion et l’animation des sessions."
        ],
        challenges: "Concevoir une interface simple pour le site vitrine tout en intégrant une partie admin performante et ergonomique. La gestion du QR code dynamique et du formulaire interactif représentait un vrai défi technique.",
        solution: "J’ai développé une architecture modulaire en PHP et JavaScript, avec Bootstrap pour un design responsive. L’intégration du QR code et du formulaire dynamique permet une interaction fluide entre formateurs et participants.",
        features: [
            "Site vitrine présentant les formations",
            "Espace administration pour formateurs",
            "Scanner QR code pour afficher un formulaire aux participants",
            "Formulaire numérique interactif pour collecte de données",
            "Design responsive et accessible"
        ],
        date: "2024",
        status: "En production",
        tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap", "QR Code", "Formulaire dynamique"],
        github: "https://github.com/devilghostg/prevformation",
        demo: "https://prevformation.re/"
    },
    {
        id: 3,
        title: "Donuts 3D",
        category: ["Web", "3D"],
        image: "/img/donuts.png",
        description: "Site interactif présentant des donuts en 3D avec animations réalisées grâce à Three.js. Développement front-end en HTML et CSS pour une expérience visuelle immersive. (fictif)",
        longDescription: [
          "Donuts 3D est un projet expérimental que j'ai développé pendant que j'attendais mon vol à l'aéroport. Ayant quelques heures devant moi, j'ai décidé d'explorer Three.js, une bibliothèque JavaScript populaire pour créer des animations 3D dans le navigateur.",
          "Le site présente des modèles 3D de donuts que l'utilisateur peut faire pivoter, zoomer et interagir de différentes façons. J'ai implémenté des effets d'éclairage et des textures réalistes pour rendre l'expérience plus immersive.",
          "Ce projet était avant tout un moyen d'apprendre et d'expérimenter avec les technologies 3D sur le web, tout en passant le temps de manière productive pendant une attente à l'aéroport."
        ],
        challenges: "Le principal défi était d'apprendre rapidement les bases de Three.js dans un environnement peu propice (aéroport) et avec une connexion internet limitée. La création de modèles 3D réalistes et l'optimisation des performances pour une expérience fluide étaient également des défis importants.",
        solution: "J'ai commencé par étudier la documentation de Three.js et quelques tutoriels basiques que j'avais téléchargés avant. Pour les modèles 3D, j'ai utilisé des formes géométriques de base que j'ai personnalisées avec des textures et des matériaux pour créer des donuts réalistes. J'ai également optimisé le rendu pour assurer une bonne performance même sur des appareils moins puissants.",
        features: [
          "Modèles 3D interactifs de donuts",
          "Contrôles de caméra pour rotation, zoom et panoramique",
          "Effets d'éclairage et textures réalistes",
          "Interface utilisateur intuitive",
          "Design responsive adapté à différents appareils"
        ],
        date: "2023",
        status: "Projet expérimental",
        tags: ["HTML5", "CSS3", "JavaScript", "Three.js"],
        github: "https://github.com/devilghostg/donuts-3d",
        demo: "/page/donuts/donuts.html"
    },
    {
        id: 4,
        title: "Slup-Dev.fr",
        category: ["Web", "Freelance"],
        image: "/img/logo.png",
        description: "Site web personnel pour présenter Slup-Dev, mettant en avant mes projets, services et compétences en développement web avec un design moderne et responsive.",
        longDescription: [
          "Slup-Dev.fr est mon site web professionnel que j'ai conçu pour présenter mes services de développement web en tant que freelance. Ce site sert de vitrine pour mes compétences, mon portfolio et les services que je propose à mes clients potentiels.",
          "J'ai développé ce site de A à Z en utilisant des technologies web modernes pour créer une expérience utilisateur fluide et engageante. Le design est minimaliste mais efficace, mettant l'accent sur la lisibilité et l'accessibilité tout en reflétant mon identité professionnelle.",
          "Le site comprend plusieurs sections : une présentation de mes services, un portfolio de projets réalisés, des témoignages clients, et un formulaire de contact pour les demandes de devis. Chaque élément a été soigneusement conçu pour convertir les visiteurs en clients."
        ],
        challenges: "Le principal défi était de créer un site qui me représente professionnellement tout en se démarquant dans un marché saturé de développeurs freelance. Il fallait trouver le bon équilibre entre présentation technique de mes compétences et communication claire de ma proposition de valeur pour des clients non-techniques.",
        solution: "J'ai opté pour une approche centrée sur l'utilisateur, en structurant le site autour des problèmes que je résous pour mes clients plutôt que simplement lister mes compétences techniques. J'ai également mis en place un système de blog pour partager mes connaissances et améliorer mon référencement naturel, ainsi qu'un processus de devis simplifié pour faciliter la prise de contact.",
        features: [
          "Présentation des services de développement web",
          "Portfolio de projets avec études de cas détaillées",
          "Système de devis en ligne",
          "Blog technique avec partage de connaissances",
          "Témoignages clients",
          "Design responsive optimisé pour tous les appareils",
          "Optimisation SEO pour une meilleure visibilité"
        ],
        date: "2023",
        status: "En ligne",
        tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "Portfolio", "Freelance"],
        github: "https://github.com/devilghostg/slup-dev-fr",
        demo: "https://slup-dev.fr"
    },
    {
        id: 5,
        title: "Application de tracking et reconnaissance animale",
        category: ["Python", "IA"],
        image: "/img/tracking.jpeg",
        description: "Projet réalisé en 1 semaine dans le cadre de ma formation. Application utilisant Python pour détecter et suivre des animaux via la reconnaissance visuelle. Prototype fonctionnel, en cours d'amélioration.",
        longDescription: [
          "Cette application de tracking et reconnaissance animale a été développée dans le cadre d'un défi d'une semaine lors de ma formation en intelligence artificielle. L'objectif était de créer un système capable de détecter, identifier et suivre différentes espèces animales dans des vidéos ou flux en direct.",
          "J'ai utilisé Python comme langage principal, avec OpenCV pour le traitement d'image et la détection de mouvement, ainsi que des modèles de deep learning pré-entraînés que j'ai adaptés pour la reconnaissance des espèces animales spécifiques.",
          "Bien que développé dans un temps limité, le prototype est fonctionnel et capable de reconnaître plusieurs espèces communes avec une précision acceptable. Ce projet m'a permis d'approfondir mes connaissances en vision par ordinateur et en apprentissage automatique appliqué à des cas concrets."
        ],
        challenges: "Les principaux défis étaient liés à la contrainte de temps (une semaine seulement), à la diversité des espèces animales à reconnaître, et aux problèmes classiques de vision par ordinateur comme les variations d'éclairage, les occlusions partielles et les mouvements rapides qui compliquent le suivi.",
        solution: "J'ai adopté une approche en deux étapes : d'abord une détection générique d'objets en mouvement avec OpenCV, puis une classification des zones détectées à l'aide d'un réseau de neurones convolutif adapté à partir d'un modèle pré-entraîné. Pour optimiser le temps de développement, j'ai utilisé le transfer learning sur un modèle MobileNet, que j'ai affiné avec un petit ensemble de données d'animaux que j'ai constitué et annoté manuellement.",
        features: [
          "Détection et suivi d'animaux en temps réel",
          "Reconnaissance de plusieurs espèces communes",
          "Interface utilisateur simple pour visualiser les résultats",
          "Capacité de traitement de vidéos enregistrées ou flux en direct",
          "Génération de statistiques sur les animaux détectés",
          "Mode debug pour visualiser les différentes étapes du traitement"
        ],
        date: "2023",
        status: "Prototype fonctionnel",
        tags: ["Python", "OpenCV", "Reconnaissance animale", "IA", "Projet de formation"],
        github: "https://github.com/devilghostg/tracking-animal",
        demo: ""
    },
    {
        id: 6,
        title: "Projet Machine Learning - Création d'une IA personnalisée",
        category: ["Python", "Machine Learning"],
        image: "/img/ml.png",
        description: "Développement en cours d'un modèle de Machine Learning visant à créer une intelligence artificielle personnalisée. Exploration des algorithmes supervisés et non supervisés, traitement des données, et optimisation des performances.",
        longDescription: [
          "Ce projet de Machine Learning est une exploration approfondie des techniques d'intelligence artificielle modernes pour créer un système personnalisé adapté à mes besoins spécifiques. Il s'agit d'un projet personnel de recherche et développement que je poursuis en parallèle de mes autres activités.",
          "L'objectif est de développer une IA capable d'apprendre de mes habitudes de travail, de mes préférences et de mes données personnelles pour m'assister de manière proactive dans diverses tâches quotidiennes, comme la gestion de l'information, la planification et l'automatisation de tâches répétitives.",
          "Je travaille actuellement sur différents modules qui, une fois combinés, formeront un assistant IA complet : analyse de texte, reconnaissance d'images, prédiction de séries temporelles et systèmes de recommandation personnalisés."
        ],
        challenges: "Les défis sont nombreux : créer un système qui apprend continuellement sans intervention manuelle, garantir la confidentialité des données personnelles utilisées pour l'entraînement, équilibrer la précision des prédictions avec les ressources computationnelles limitées, et concevoir une architecture modulaire qui peut évoluer avec mes besoins.",
        solution: "J'ai opté pour une architecture hybride combinant plusieurs approches : des modèles supervisés pour les tâches bien définies, des techniques d'apprentissage par renforcement pour l'adaptation continue, et des méthodes non supervisées pour la découverte de patterns. J'utilise également des techniques de federated learning pour garder les données sensibles sur mes appareils personnels tout en permettant au modèle d'apprendre.",
        features: [
          "Analyse et catégorisation automatique de documents",
          "Système de recommandation basé sur mes préférences",
          "Prédiction de séries temporelles pour anticiper certains besoins",
          "Traitement du langage naturel pour l'analyse de mes notes et communications",
          "Interface programmable pour intégrer de nouvelles sources de données",
          "Dashboard de visualisation des insights générés par l'IA"
        ],
        date: "2024",
        status: "En développement",
        tags: ["Python", "Machine Learning", "IA", "Data Science", "Projet en cours"],
        github: "https://github.com/tonCompte/ml-project",
        demo: ""
    },
    {
        id: 7,
        title: "Application JDR avec IA intégrée via Ollama",
        category: ["Python", "IA", "Jeu"],
        image: "/img/interface-jdr.png",
        description: "Développement en cours d'une application de jeu de rôle (JDR) où le maître du jeu est une IA gérée par Ollama. L'utilisateur peut choisir et contrôler l'instance de la partie pour une expérience interactive et immersive.",
        longDescription: [
          "Cette application JDR (Jeu de Rôle) innovante utilise l'intelligence artificielle comme maître du jeu, offrant une expérience de jeu de rôle entièrement nouvelle. En intégrant Ollama, une plateforme open-source pour exécuter des modèles de langage localement, j'ai créé un système qui permet aux joueurs de vivre des aventures narratives dynamiques et personnalisées.",
          "Le projet est né de ma passion pour les jeux de rôle traditionnels et de mon intérêt pour les capacités narratives des grands modèles de langage. L'objectif était de créer une expérience qui conserve la créativité et l'improvisation d'une session de JDR classique, mais qui soit accessible à tout moment, même sans groupe de joueurs ou maître du jeu humain.",
          "L'application permet aux utilisateurs de créer des personnages, de choisir des univers de jeu (fantasy, science-fiction, horreur, etc.), et de vivre des aventures générées et adaptées en temps réel par l'IA. Le système mémorise les choix et l'historique du joueur pour créer une expérience cohérente et évolutive."
        ],
        challenges: "Les principaux défis incluent la création d'une IA capable de générer des narrations cohérentes et engageantes sur la durée, l'implémentation d'un système de règles flexible mais structuré, et l'optimisation des performances pour permettre l'exécution locale des modèles d'IA sans nécessiter un matériel haut de gamme.",
        solution: "J'ai développé un système hybride qui combine des éléments scénaristiques pré-écrits avec la génération dynamique de contenu par l'IA. J'utilise Ollama pour exécuter des modèles de langage optimisés localement, avec des prompts soigneusement conçus pour guider la génération narrative. J'ai également implémenté un système de mémoire contextuelle qui permet à l'IA de maintenir la cohérence du monde et des personnages tout au long de l'aventure.",
        features: [
          "Création de personnages avec attributs, compétences et historique",
          "Multiples univers de jeu avec leurs propres règles et ambiances",
          "Génération procédurale de quêtes et d'aventures",
          "Système de combat et de résolution d'actions basé sur des règles",
          "Mémoire contextuelle pour une narration cohérente",
          "Interface utilisateur intuitive avec visualisation des scènes",
          "Possibilité de jouer en solo ou en groupe avec l'IA comme maître du jeu"
        ],
        date: "2024",
        status: "En développement",
        tags: ["Python", "IA", "Ollama", "Jeu de rôle", "Projet en cours"],
        github: "https://github.com/devilghostg/jdr-ia",
        demo: ""
    }
  ];
  
  useEffect(() => {
    // Simuler un chargement de données
    setLoading(true);
    
    // Rechercher le projet correspondant à l'ID
    const foundProject = projects.find(p => p.id === parseInt(id));
    
    // Mettre à jour l'état avec le projet trouvé
    setProject(foundProject);
    setLoading(false);
    
    // Scroll vers le haut de la page
    window.scrollTo(0, 0);
  }, [id]);
  
  // Afficher un message de chargement
  if (loading) {
    return (
      <ProjectDetailContainer>
        <ProjectContent>
          <p>Chargement...</p>
        </ProjectContent>
      </ProjectDetailContainer>
    );
  }
  
  // Si le projet n'est pas trouvé
  if (!project) {
    return (
      <ProjectDetailContainer>
        <ProjectContent>
          <NotFound>
            <h2>Projet non trouvé</h2>
            <p>Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
            <BackButton to="/projects">
              <FontAwesomeIcon icon={faArrowLeft} /> Retour aux projets
            </BackButton>
          </NotFound>
        </ProjectContent>
      </ProjectDetailContainer>
    );
  }
  
  return (
    <ProjectDetailContainer>
      <ProjectContent>
        <BackButton to="/projects">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour aux projets
        </BackButton>
        
        <ProjectHeader>
          <ProjectTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.title}
          </ProjectTitle>
          
          <ProjectMeta>
            {project.date && (
              <MetaItem>
                <FontAwesomeIcon icon={faCalendarAlt} /> {project.date}
              </MetaItem>
            )}
            {project.status && (
              <MetaItem>
                <FontAwesomeIcon icon={faLaptopCode} /> Statut: {project.status}
              </MetaItem>
            )}
          </ProjectMeta>
          
          <ProjectTags>
            {project.tags && project.tags.map((tag, index) => (
              <ProjectTag key={index}>{tag}</ProjectTag>
            ))}
          </ProjectTags>
        </ProjectHeader>
        
        <ProjectImageContainer>
          <ProjectImage src={project.image} alt={project.title} />
        </ProjectImageContainer>
        
        <ProjectSection>
          <SectionTitle>À propos du projet</SectionTitle>
          <ProjectDescription>
            {project.longDescription ? (
              project.longDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{project.description}</p>
            )}
          </ProjectDescription>
        </ProjectSection>
        
        {project.features && (
          <ProjectSection>
            <SectionTitle>Fonctionnalités</SectionTitle>
            <ProjectDescription>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </ProjectDescription>
          </ProjectSection>
        )}
        
        {project.challenges && (
          <ProjectSection>
            <SectionTitle>Défis rencontrés</SectionTitle>
            <ProjectDescription>
              <p>{project.challenges}</p>
            </ProjectDescription>
          </ProjectSection>
        )}
        
        {project.solution && (
          <ProjectSection>
            <SectionTitle>Solution technique</SectionTitle>
            <ProjectDescription>
              <p>{project.solution}</p>
            </ProjectDescription>
          </ProjectSection>
        )}
        
        <ProjectLinks>
          {/* {project.github && (
            <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} /> Voir le code
            </ProjectLink>
          )} */}
          {project.demo && (
            <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer" primary>
              <FontAwesomeIcon icon={faLink} /> Voir le projet
            </ProjectLink>
          )}
        </ProjectLinks>
      </ProjectContent>
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;
