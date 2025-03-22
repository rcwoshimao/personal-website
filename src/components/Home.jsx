import React from "react";
import './Home.css'; 
import './../App.css'; 
import pfp from './../assets/pfp.jpeg';
import sclearn from './../assets/scikit-learn.png';
import StackIcon from "tech-stack-icons";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import GoogleDocPDF from "./GoogleDocPDF/GoogleDocPDF";


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
                <div className="tooltip">
                <StackIcon name="c++" className="stack-icon" />
                    <span className="tooltiptext">c++</span>
                </div> 

                <div className="tooltip">
                <StackIcon name="python" className="stack-icon" />
                    <span className="tooltiptext">python</span>
                </div> 

                <div className="tooltip">
                <StackIcon name="java" className="stack-icon" />
                    <span className="tooltiptext">java</span>
                </div> 

                <div className="tooltip">
                <StackIcon name="streamlit" className="stack-icon" />
                    <span className="tooltiptext">streamlit</span>
                </div> 

                <div className="tooltip">
                <StackIcon name="vscode" className="stack-icon" />
                    <span className="tooltiptext">vscode</span>
                </div> 

                <div className="tooltip">
                <StackIcon name="neovim" className="stack-icon" />
                    <span className="tooltiptext">neovim</span>
                </div>
            </div>

            <h3 className="centered-text">Web and mobile development</h3>
            <div className='icons'> 
                <div className="tooltip">
                    <StackIcon name="reactjs" className="stack-icon" />
                    <span className="tooltiptext">reactjs & react native</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="swift" className="stack-icon" />
                    <span className="tooltiptext">swift</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="tailwindcss" className="stack-icon" />
                    <span className="tooltiptext">tailwindcss</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="postman" className="stack-icon" />
                    <span className="tooltiptext">postman</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="typescript" className="stack-icon" />
                    <span className="tooltiptext">typescript</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="figma" className="stack-icon" />
                    <span className="tooltiptext">figma</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="firebase" className="stack-icon" />
                    <span className="tooltiptext">firebase</span>
                </div>
                <div className="tooltip">
                    <StackIcon name="nodejs" className="stack-icon" />
                    <span className="tooltiptext">nodejs</span>
                </div>


            </div>

            <h3 className="centered-text">Machine learning</h3>
            <div className='icons'> 
                <div className="tooltip">   
                    <StackIcon name="pytorch" className="stack-icon" />
                    <span className="tooltiptext">pytorch</span>
                </div>
                <div className="tooltip">
                    <img src={sclearn} alt="profile" className="stack-icon" />
                    <span className="tooltiptext">sckit learn</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
