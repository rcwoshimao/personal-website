import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import "./../App.css";
import pfp from "./../assets/pfp.jpeg";
import sclearn from "./../assets/scikit-learn.png";
import StackIcon from "tech-stack-icons";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import GoogleDocPDF from "./GoogleDocPDF/GoogleDocPDF";
import ProjectElement from "./ProjectElement/ProjectElement";
import cogs107a from "./../assets/cogs107Athumbnail.gif";
import RSDB from "./../assets/RSDB.png";
import tensorflow from "./../assets/tensorflow.png";

// Animation variants
const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// TooltipIcon Component with animation
const TooltipIcon = ({ icon, label, delay }) => (
  <motion.div className="tooltip" initial="hidden" animate="visible" variants={fadeInDown} transition={{ delay }}>
    <StackIcon name={icon} className="stack-icon" />
    <span className="tooltiptext">{label}</span>
  </motion.div>
);

const TeachingExperiences = [
  {
    institution: "Halıcıoğlu Data Science Institute",
    role: "Instructional Assistant",
    period: "2024 - Ongoing",
    courses: "DSC 10, 40A",
    details: [
      "Provided 100+ hours of in-person instruction weekly",
      "Supported 1,000+ students in Python programming, data analysis, and foundational concepts",
    ],
  },
  {
    institution: "CodePath",
    role: "Tech Fellow",
    period: "2023",
    courses: "Intro to iOS Development",
    details: [
      "Mentored & supported 200+ students in iOS development using Swift",
      "Provided technical assistance during sessions, assignments, & labs",
    ],
  },
  {
    institution: "4S Foundation",
    role: "Mentor",
    period: "2022 - Ongoing",
    courses: "College essay preparation",
    details: [
      "Offered personalized guidance for students navigating college applications",
      "Assisted with essays, financial aid, and equitable access to education",
    ],
  },
];

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
          <div className="connect-icons">
            <motion.a href="https://github.com/rcwoshimao" target="_blank" rel="noopener noreferrer" variants={fadeInDown} transition={{ delay: 0.4 }}>
              <FaGithub className="connect-icon" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/jiaying-chen01/" target="_blank" rel="noopener noreferrer" variants={fadeInDown} transition={{ delay: 0.5 }}>
              <FaLinkedin className="connect-icon" />
            </motion.a>
            <GoogleDocPDF docLink={webDevResume}>
              <FaFileAlt className="connect-icon" style={{ color: "#4d5e21" }} title="Web and mobile resume" />
            </GoogleDocPDF>
            <GoogleDocPDF docLink={dsResume}>
              <FaFileAlt className="connect-icon" style={{ color: "#b52849" }} title="Data science resume" />
            </GoogleDocPDF>
          </div>
        </motion.div>
      </motion.div>

      {/* Techstacks Section */}
      <motion.h1 className="centered-text" variants={fadeInDown} transition={{ delay: 0.6 }}>
        Techstacks
      </motion.h1>
      
      <h3 className="centered-text">General</h3>
      <motion.div className="icons" variants={fadeInDown} transition={{ delay: 0.7 }}>
        <TooltipIcon icon="js" label="js" delay={0.3} />  
        <TooltipIcon icon="c++" label="c++" delay={0.2} />
        <TooltipIcon icon="python" label="python" delay={0.3} />
        <TooltipIcon icon="java" label="java" delay={0.4} />
        <TooltipIcon icon="swift" label="swift"  delay={0.2}  />
        <TooltipIcon icon="vim" label="vim" delay={0.3} />  
        <TooltipIcon icon="vscode" label="vscode" delay={0.3} />  

      </motion.div>

      <h3 className="centered-text">Web & mobile</h3>
            <motion.div className='icons' variants={fadeInDown} transition={{ delay: 0.7 }}> 
                <TooltipIcon icon="reactjs" label="reactjs & react native"  delay={0.2}  />
                <TooltipIcon icon="tailwindcss" label="tailwindcss" delay={0.2}  />
                <TooltipIcon icon="postman" label="postman"  delay={0.2} />
                <TooltipIcon icon="typescript" label="typescript" delay={0.2}  />
                <TooltipIcon icon="firebase" label="firebase"  delay={0.2} />
                <TooltipIcon icon="nodejs" label="nodejs"  delay={0.2} />
                <TooltipIcon icon="vitejs" label="vitejs"  delay={0.2} />
                <TooltipIcon icon="materialui" label="materialui"  delay={0.2} />
                <TooltipIcon icon="docusaurus" label="docusaurus"  delay={0.2} />

    </motion.div>


      <h3 className="centered-text">ML</h3>
      <motion.div className="icons" variants={fadeInDown} transition={{ delay: 0.8 }}>
        <TooltipIcon icon="streamlit" label="streamlit"  delay={0.2} />
        <TooltipIcon icon="pytorch" label="pytorch" delay={0.3} />
        <div className="tooltip">
          <motion.img src={sclearn} alt="scikit-learn" className="stack-icon" variants={fadeInDown} transition={{ delay: 0.4 }} />
          <span className="tooltiptext">scikit-learn</span>
        </div>
        <div className="tooltip">
          <motion.img src={tensorflow} alt="tensorflow" className="stack-icon" variants={fadeInDown} transition={{ delay: 0.4 }} />
          <span className="tooltiptext">tensorflow</span>
        </div>
      </motion.div>

      <h3 className="centered-text">Design</h3>
            <motion.div className='icons' variants={fadeInDown} transition={{ delay: 0.7 }} > 
                <TooltipIcon icon="figma" label="figma" delay={0.2}/>
                <TooltipIcon icon="canva" label="canva" delay={0.2}/>
                <TooltipIcon icon="procreate" label="procreate" delay={0.2}/>
            </motion.div>

      <br/>
      {/* Featured Projects */}
      <motion.h1 className="centered-text" variants={fadeInDown} transition={{ delay: 1 }}>
        Featured Projects
      </motion.h1>
      <motion.div className="featured-projects project-subdiv" variants={fadeInDown} transition={{ delay: 1.1 }}>
        <ProjectElement image={cogs107a} name="COGS 107A" shortDescription="Concept map for Neuroanatomy and Physiology." link="https://www.canva.com/design/DAGbfErBzVw/fuuDI_q8lPQpraYUFEDCfw/view" />
        <ProjectElement image={RSDB} name="Recommendation for Business Owners (RSDB)" shortDescription="A hybrid recommender system." link="https://github.com/KevinBian107/RSDB" />
      </motion.div>

      <motion.h2 className="centered-text"> <a href="/projects" style={{ textDecoration: 'underline'}}>All Projects &gt;&gt;</a> </motion.h2>


      <br/>
      {/* Tutoring Experiences */}
      <motion.h1 className="centered-text" variants={fadeInDown} transition={{ delay: 1.2 }}>
        🎓 Tutoring Experiences
      </motion.h1>
      <motion.div className="centered-text" variants={fadeInDown} transition={{ delay: 1.3 }}>
        {TeachingExperiences.map((exp, index) => (
          <motion.div key={index} className="mb-6 border-b pb-4" variants={fadeInDown} transition={{ delay: 1.3 + index * 0.2 }}>
            <h3 className="text-xl font-semibold">{exp.institution} – <span className="italic">{exp.role}</span></h3>
            <p className="text-gray-600 text-sm">🗓️ <strong>{exp.period}</strong> | 📚 <strong>{exp.courses}</strong></p>
            <ul className="list-disc pl-5 mt-2">
              {exp.details.map((detail, i) => (
                <li key={i} className="text-gray-700">{detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
