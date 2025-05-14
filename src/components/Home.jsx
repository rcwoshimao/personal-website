import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import "./../App.css";
import ProjectsList from "./ProjectElements/ProjectList.jsx";

import GoogleDocPDF from "./GoogleDocPDF/GoogleDocPDF";

import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import StackIcon from "tech-stack-icons";

import {pfp, teaching_experiences, general_stack, webdev_stack, ml_stack, design_stack} from "./../personal-data.js"; 
import techStackBanner from '../assets/tech_stacks.png';
import projectsBannerLarge from '../assets/featured_projects_large.png';
import projectsBannerSmall from '../assets/featured_projects_small.png';
import teachingBanner from '../assets/teaching_experiences.png';

// Animation variants
const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// TooltipIcon Component with animation
const TooltipIcon = ({ icon, label}) => {
  let delay = Math.random() * 0.2 + 0.1
  return (
    <>
    {typeof icon === "string" &&! icon.includes("/") ? (
      <motion.div className="tooltip" initial="hidden" animate="visible" variants={fadeInDown} transition={{ delay}}>
        <StackIcon name={icon} className="stack-icon" />
        <span className="tooltiptext">{label}</span>
      </motion.div>
    ): typeof icon === "string" ? (
      <div className="tooltip">
          <motion.img src={icon} alt={label} className="stack-icon" variants={fadeInDown} transition={{ delay}} />
          <span className="tooltiptext">{label}</span>
        </div>
    ):(
      <span className="error-message">Invalid icon type</span>
    )}
    </>
); 
}

const Icons = ({stack_list}) => {
  let delay = Math.random() * 0.2 + 0.6
  return (
    <motion.div className="icons" variants={fadeInDown} transition={{ delay }}>
    {stack_list.map(({ icon, label }) => (
      <TooltipIcon key={icon} icon={icon} label={label}/>
    ))}
    </motion.div>
  )
}



const Home = () => {
  let webDevResume = "https://docs.google.com/document/d/1b72j3ZAOqG8z63yta5wi4md5NnWhQsHg5oi2bGXguKk/edit?usp=sharing";
  let dsResume = "https://docs.google.com/document/d/1dba08_q62qje0yTVH1Mgbz95VTNibg53e2VRiD1b50A/edit?usp=sharing";

  return (
    <motion.div className="home" initial="hidden" animate="visible" variants={fadeInDown}>
      {/* About Me Section */}
      <motion.div className="about-me" variants={fadeInDown}>
        <motion.div className="about-me-children" variants={fadeInDown}>
          <motion.img src={pfp} alt="profile" initial="hidden" animate="visible" variants={fadeInDown} />
        </motion.div>
        <motion.div className="about-me-children" variants={fadeInDown} transition={{ delay: 0.2 }}>
          <h1>Hi! This is Rebecca</h1>
          <p className="paragraph">
            I am a passionate developer proficient in Java, Python, Swift, and React with hands-on experience in web and mobile development and data analysis ☺️. 
            I also enjoy the process of teaching, and have experience tutoring for non-profit organizations in a wide range of technical fields.
          </p>

          <div className='resumes' style={{ marginTop: "20px" }}> 
            <div className='resume_1' display="block" > 
            <GoogleDocPDF docLink={webDevResume}>
              <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <FaFileAlt className="connect-icon" style={{ color: "#910a45" }} />
                <p className="paragraph" style={{ margin: 0, textDecoration: "underline"}}>Web Dev resume</p>
              </div>
            </GoogleDocPDF>
            </div>
            <div className='resume_2' display="block" > 
            <GoogleDocPDF docLink={dsResume}>
              <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <FaFileAlt className="connect-icon" style={{ color: "#4d5e21" }} />
                  <p className="paragraph" style={{ margin: 0, textDecoration: "underline" }}>Data Science resume</p>
              </div>
              </GoogleDocPDF>
              </div>
          </div>

          <div className="connect-icons">
            <motion.a href="https://github.com/rcwoshimao" target="_blank" rel="noopener noreferrer" variants={fadeInDown} transition={{ delay: 0.4 }}>
              <FaGithub className="connect-icon" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/jiaying-chen01/" target="_blank" rel="noopener noreferrer" variants={fadeInDown} transition={{ delay: 0.5 }}>
              <FaLinkedin className="connect-icon" />
            </motion.a>
          </div>

        </motion.div>
      </motion.div>

      {/* Techstacks Section */}
      <div className="techstack-banner-container">
        <img src={techStackBanner} alt="Tech Stack Banner" className="techstack-banner-img" />
      </div>
      <div className="techstack-grid">
        <motion.div 
          className="techstack-section" 
          variants={fadeInDown} 
          transition={{ delay: 0.7 }}
        >
          <h3 className="centered-text">General</h3>
          <Icons stack_list={general_stack}/>
        </motion.div>
        <motion.div 
          className="techstack-section" 
          variants={fadeInDown} 
          transition={{ delay: 0.8 }}
        >
          <h3 className="centered-text">Web & mobile</h3>
          <Icons stack_list={webdev_stack}/>
        </motion.div>
        <motion.div 
          className="techstack-section" 
          variants={fadeInDown} 
          transition={{ delay: 0.9 }}
        >
          <h3 className="centered-text">ML</h3>
          <Icons stack_list={ml_stack}/>
        </motion.div>
        <motion.div 
          className="techstack-section" 
          variants={fadeInDown} 
          transition={{ delay: 1.0 }}
        >
          <h3 className="centered-text">Design</h3>
          <Icons stack_list={design_stack}/>
        </motion.div>
      </div>

      {/* Featured Projects */}
      <div className="featured-projects-container">
        <motion.div className="projects-banner-container" variants={fadeInDown} transition={{ delay: 1 }}>
          <img src={projectsBannerLarge} alt="Featured Projects Banner" className="projects-banner-img projects-banner-large" />
          <img src={projectsBannerSmall} alt="Featured Projects Banner" className="projects-banner-img projects-banner-small" />
        </motion.div>
        <motion.div className="project-subdiv" variants={fadeInDown} transition={{ delay: 1.1 }}>
          <ProjectsList className="projects featured-projects" selectedProjects={["CSE 150B", "COGS 107A/B", "Recommendation for Business owners (RSDB)"]} /> 
        </motion.div>

        <motion.h2 className="centered-text"> <a href="/projects" style={{ textDecoration: 'underline'}}>All Projects &gt;&gt;</a> </motion.h2>

        <br/>
      </div>
      {/* Tutoring Experiences */}
      <div className="teaching-banner-container">
        <img src={teachingBanner} alt="Teaching Experiences Banner" className="teaching-banner-img" />
      </div>
      <div className="teaching-grid">
        {teaching_experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="teaching-section" 
            variants={fadeInDown} 
            transition={{ delay: 1.2 + index * 0.2 }}
          >
            <h3 className="teaching-header">{exp.institution}</h3>
            <p className="teaching-role">{exp.role}</p>
            <p className="teaching-period">🗓️ {exp.period}</p>
            <p className="teaching-courses">📚 {exp.courses}</p>
            <ul className="teaching-details">
              {exp.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default Home;
