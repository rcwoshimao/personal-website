import React from "react";
import './Home.css'; 
import './../App.css'; 
import pfp from './../assets/pfp.jpeg';
import sclearn from './../assets/scikit-learn.png';
import StackIcon from "tech-stack-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <div className="about-me">
                <div className="about-me-children">
                    <img src={pfp} alt="profile" />
                </div>
                <div className="about-me-children">
                    <h1>About me</h1>
                    <p className='paragraph'>
                        Hi! My name is Rebecca Chen. I am an undergraduate student at UCSD majoring in Cognitive Science and minoring in Computer Science. My field of interest spans from Machine Learning to web development. I have a strong interest in general education, having done tutoring for numerous organizations for STEM or none-STEM. 
                        - Past and on-going tutorings: 
                            - 2020 
                    </p>
                    <div className='connect-icons'>
                        <a href="https://github.com/rcwoshimao"  target="_blank" rel="noopener noreferrer">
                            <FaGithub className="connect-icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/jiaying-chen01/" target="_blank" rel="noopener noreferrer"> 
                        <FaLinkedin className="connect-icon" />
                        </a>
                    </div>
                </div>
            </div>
            
            <h1 className="centered-text" >Techstacks</h1>
            
            <h3 className="centered-text">General </h3>
            <div className='icons'> 
                <div class="tooltip">
                <StackIcon name="c++" className="stack-icon" />
                    <span class="tooltiptext">c++</span>
                </div> 

                <div class="tooltip">
                <StackIcon name="python" className="stack-icon" />
                    <span class="tooltiptext">python</span>
                </div> 

                <div class="tooltip">
                <StackIcon name="java" className="stack-icon" />
                    <span class="tooltiptext">java</span>
                </div> 

                <div class="tooltip">
                <StackIcon name="streamlit" className="stack-icon" />
                    <span class="tooltiptext">streamlit</span>
                </div> 

                <div class="tooltip">
                <StackIcon name="vscode" className="stack-icon" />
                    <span class="tooltiptext">vscode</span>
                </div> 

                <div class="tooltip">
                <StackIcon name="neovim" className="stack-icon" />
                    <span class="tooltiptext">neovim</span>
                </div>
            </div>

            <h3 className="centered-text">Web and mobile development</h3>
            <div className='icons'> 
                <div class="tooltip">
                    <StackIcon name="reactjs" className="stack-icon" />
                    <span class="tooltiptext">reactjs & react native</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="swift" className="stack-icon" />
                    <span class="tooltiptext">swift</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="tailwindcss" className="stack-icon" />
                    <span class="tooltiptext">tailwindcss</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="postman" className="stack-icon" />
                    <span class="tooltiptext">postman</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="typescript" className="stack-icon" />
                    <span class="tooltiptext">typescript</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="figma" className="stack-icon" />
                    <span class="tooltiptext">figma</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="firebase" className="stack-icon" />
                    <span class="tooltiptext">firebase</span>
                </div>
                <div class="tooltip">
                    <StackIcon name="nodejs" className="stack-icon" />
                    <span class="tooltiptext">nodejs</span>
                </div>


            </div>

            <h3 className="centered-text">Machine learning</h3>
            <div className='icons'> 
                <div class="tooltip">   
                    <StackIcon name="pytorch" className="stack-icon" />
                    <span class="tooltiptext">pytorch</span>
                </div>
                <div class="tooltip">
                    <img src={sclearn} alt="profile" className="stack-icon" />
                    <span class="tooltiptext">sckit learn</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
