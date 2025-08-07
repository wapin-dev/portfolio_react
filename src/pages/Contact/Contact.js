import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow-x: hidden;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--primary);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray);
  margin-bottom: 2.5rem;
  max-width: 500px;
`;

const ContactDetailsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const ContactDetail = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  .icon-container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(100, 255, 218, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  &:hover .icon-container {
    background: var(--primary);
    color: var(--dark);
    transform: translateY(-5px);
  }
  
  .detail-content {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
    
    p, a {
      font-size: 1rem;
      color: var(--gray);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    a:hover {
      color: var(--primary);
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  a {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light);
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--primary);
      color: var(--dark);
      transform: translateY(-5px);
    }
  }
`;

const ContactFormContainer = styled.div`
  background: rgba(15, 15, 15, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--light);
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
`;

const FormLabel = styled.label`
  position: absolute;
  left: 15px;
  top: ${props => props.focused || props.hasValue ? '-12px' : '15px'};
  font-size: ${props => props.focused || props.hasValue ? '0.8rem' : '1rem'};
  color: ${props => props.focused ? 'var(--primary)' : 'var(--gray)'};
  background: ${props => props.focused || props.hasValue ? 'rgba(15, 15, 15, 0.9)' : 'transparent'};
  padding: ${props => props.focused || props.hasValue ? '0 5px' : '0'};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.focused ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 5px;
  color: var(--light);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.focused ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 5px;
  color: var(--light);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    
    &:hover {
      color: var(--primary);
      
      &::before {
        width: 0;
      }
    }
  }
`;

const FormMessage = styled(motion.div)`
  margin-top: 1.5rem;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: ${props => props.success ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)'};
  color: ${props => props.success ? '#2ed573' : '#ff4757'};
  border: 1px solid ${props => props.success ? '#2ed573' : '#ff4757'};
`;

const MapContainer = styled(motion.div)`
  width: 100%;
  height: 400px;
  margin-top: 5rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(10, 10, 10, 0.2), rgba(10, 10, 10, 0));
    pointer-events: none;
    z-index: 1;
  }
`;

const contactData = {
  title: "CONTACTEZ MOI",
  subtitle: "N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.",
  location: {
    icon: "fas fa-map-marker-alt",
    title: "Localisation",
    info: "Saint-Joseph, La Réunion"
  },
  email: {
    icon: "fas fa-envelope",
    title: "Email",
    info: "contact@slup-dev.fr",
    link: "mailto:boyer.dorian974@gmail.com"
  },
  social: [
    {
      name: "GitHub",
      icon: "fab fa-github",
      url: "https://github.com/devilghostg"
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin",
      url: "https://www.linkedin.com/in/dorian-boyer-736003203/"
    }
  ],
  formTitle: "ENVOYER UN MESSAGE",
  buttonText: "ENVOYER UN EMAIL"
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef(null);
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Animation pour le formulaire
    gsap.fromTo(formRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Animation pour la carte
    gsap.fromTo(mapRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  const handleFocus = (field) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.'
      });
      
      // Réinitialiser le formulaire après 5 secondes
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 2000);
  };
  
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
    <ContactContainer>
      <ContactContent>
        <ContactInfo>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle variants={itemVariants}>{contactData.title}</SectionTitle>
            
            <ContactDescription variants={itemVariants}>
              {contactData.subtitle}
            </ContactDescription>
            
            <ContactDetailsContainer variants={containerVariants}>
              <ContactDetail key="location" variants={itemVariants}>
                <div className="icon-container">
                  <i className={contactData.location.icon}></i>
                </div>
                <div className="detail-content">
                  <h4>{contactData.location.title}</h4>
                  <p>{contactData.location.info}</p>
                </div>
              </ContactDetail>
              <ContactDetail key="email" variants={itemVariants}>
                <div className="icon-container">
                  <i className={contactData.email.icon}></i>
                </div>
                <div className="detail-content">
                  <h4>{contactData.email.title}</h4>
                  <a href={contactData.email.link}>{contactData.email.info}</a>
                </div>
              </ContactDetail>
            </ContactDetailsContainer>
            
            <SocialLinks variants={itemVariants}>
              {contactData.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </SocialLinks>
          </motion.div>
        </ContactInfo>
        
        <ContactFormContainer ref={formRef}>
          <FormTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {contactData.formTitle}
          </FormTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FormLabel 
                focused={focusedField === 'name'} 
                hasValue={formState.name.length > 0}
              >
                Nom
              </FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                focused={focusedField === 'name'}
                required
              />
            </FormGroup>
            
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FormLabel 
                focused={focusedField === 'email'} 
                hasValue={formState.email.length > 0}
              >
                Email
              </FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                focused={focusedField === 'email'}
                required
              />
            </FormGroup>
            
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FormLabel 
                focused={focusedField === 'subject'} 
                hasValue={formState.subject.length > 0}
              >
                Sujet
              </FormLabel>
              <FormInput
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                focused={focusedField === 'subject'}
                required
              />
            </FormGroup>
            
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FormLabel 
                focused={focusedField === 'message'} 
                hasValue={formState.message.length > 0}
              >
                Message
              </FormLabel>
              <FormTextarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                focused={focusedField === 'message'}
                required
              />
            </FormGroup>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Envoi en cours...' : contactData.buttonText}
              </SubmitButton>
            </motion.div>
            
            {formStatus.submitted && (
              <FormMessage
                success={formStatus.success}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </FormMessage>
            )}
          </form>
        </ContactFormContainer>
      </ContactContent>
      
      <MapContainer 
        ref={mapRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410655067!2d2.2769954081275857!3d48.85883773941345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1650000000000!5m2!1sfr!2sfr" 
          title="Localisation"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MapContainer>
    </ContactContainer>
  );
};

export default Contact;
