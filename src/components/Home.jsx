import React from "react";
import './Home.css'; 
import './../App.css'; 
import pfp from './../assets/pfp.jpeg';
import sclearn from './../assets/scikit-learn.png';
import StackIcon from "tech-stack-icons";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import GoogleDocPDF from "./GoogleDocPDF/GoogleDocPDF";
import ProjectElement from "./ProjectElement/ProjectElement";
import cogs107a from "./../assets/cogs107Athumbnail.gif";
import RSDB from "./../assets/RSDB.png"; 


// Reusable TooltipIcon Component
const TooltipIcon = ({ icon, label }) => (
    <div className="tooltip">
        <StackIcon name={icon} className="stack-icon" />
        <span className="tooltiptext">{label}</span>
    </div>
);

const Home = () => {
    let webDevResume = "https://docs.google.com/document/d/1b72j3ZAOqG8z63yta5wi4md5NnWhQsHg5oi2bGXguKk/edit?usp=sharing"; 
    let dsResume = "https://docs.google.com/document/d/1dba08_q62qje0yTVH1Mgbz95VTNibg53e2VRiD1b50A/edit?usp=sharing"; 

    return (
        <div className="home">
            <div className="about-me">
                <div className="about-me-children">
                    <img src={pfp} alt="profile"/>
                </div>
                <div className="about-me-children">
                    <h1>Hi! This is Rebecca</h1>
                    <p className='paragraph'>
                       I am an undergraduate student at UCSD majoring in Cognitive Science and minoring in Computer Science. My field of interest spans from Machine Learning to web development. I have a strong interest in general education, having done tutoring for numerous organizations for STEM or none-STEM. 
                    </p>
                    <div className='connect-icons'>
                        <a href="https://github.com/rcwoshimao"  target="_blank" rel="noopener noreferrer">
                            <FaGithub className="connect-icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/jiaying-chen01/" target="_blank" rel="noopener noreferrer"> 
                            <FaLinkedin className="connect-icon" />
                        </a>

                        <GoogleDocPDF docLink={webDevResume}>
                            <FaFileAlt className="connect-icon"  style={{ color: '#4d5e21' }} title="Web and mobile resume"  />
                        </GoogleDocPDF>
                        <GoogleDocPDF docLink={dsResume}>
                            <FaFileAlt className="connect-icon" style={{ color: '#b52849' }}  title="Data science resume" />
                        </GoogleDocPDF>
                    </div>
                </div>
            </div>
                
            <h1 className="centered-text" >Techstacks</h1>
            
            <h3 className="centered-text">General </h3>
            <div className='icons'> 
                <TooltipIcon icon="c++" label="c++" />
                <TooltipIcon icon="python" label="python" />
                <TooltipIcon icon="java" label="java" />
                <TooltipIcon icon="streamlit" label="streamlit" />
                <TooltipIcon icon="vscode" label="vscode" />
                <TooltipIcon icon="neovim" label="neovim" />
            </div>

            <h3 className="centered-text">Web and mobile development</h3>
            <div className='icons'> 
                <TooltipIcon icon="reactjs" label="reactjs & react native" />
                <TooltipIcon icon="swift" label="swift" />
                <TooltipIcon icon="tailwindcss" label="tailwindcss" />
                <TooltipIcon icon="postman" label="postman" />
                <TooltipIcon icon="typescript" label="typescript" />
                <TooltipIcon icon="figma" label="figma" />
                <TooltipIcon icon="firebase" label="firebase" />
                <TooltipIcon icon="nodejs" label="nodejs" />
            </div>

            <h3 className="centered-text">Machine learning</h3>
            <div className='icons'> 
                <TooltipIcon icon="pytorch" label="pytorch" />
                <div className="tooltip">   
                    <img src={sclearn} alt="profile" className="stack-icon" />
                    <span className="tooltiptext">scikit-learn</span>
                </div>
            </div>
            
            <h1 className="centered-text"> Featured projects</h1>
            <ProjectElement image={cogs107a} name={"COGS 107A"}  shortDescription="concept map for cogs 107A,  Neuroanatomy and Physiology. A course focused on principles of brain organization, from neurons to circuits to functional networks " link="https://www.canva.com/design/DAGbfErBzVw/fuuDI_q8lPQpraYUFEDCfw/view?utm_content=DAGbfErBzVw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h08dfbf0273" /> 

            <ProjectElement image={RSDB} name={"Recommendation for Business owners (RSDB)"} shortDescription="A hybrid recommender system for predicting a user's rating of a business." link={"https://github.com/KevinBian107/RSDB"} /> 
            

            <h1 className="centered-text"> Teaching experiences</h1>
        </div>
    );
};

export default Home;
