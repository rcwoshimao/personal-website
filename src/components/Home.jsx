import React from "react";
import './Home.css'; 
import './../App.css'; 
import pfp from './../assets/pfp.jpeg';
import sclearn from './../assets/scikit-learn.png';
import StackIcon from "tech-stack-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
                        Hi! My name is Rebecca Chen. I am an undergraduate student at UCSD majoring in Cognitive Science and minoring in Computer Science. My field of interest spans from Machine Learning to web development.
                    </p>
                    <p>Test paragraph 2</p>
                    <div className='connect-icons'>
                        <FaGithub className="connect-icon" />
                        <FaLinkedin className="connect-icon" />
                    </div>
                </div>
            </div>
            
            <h1 className="centered-text" >Techstacks</h1>
            
            <h2 className="centered-text">General</h2>
            <div className='icons'> 
                <StackIcon name="c++" className="stack-icon" />
                <StackIcon name="python" className="stack-icon" />
                <StackIcon name="java" className="stack-icon" />
                <StackIcon name="streamlit" className="stack-icon" />
                <StackIcon name="vscode" className="stack-icon" />
                <StackIcon name="neovim" className="stack-icon" />
            </div>

            <h2 className="centered-text">Web and mobile development</h2>
            <div className='icons'> 
                <StackIcon name="reactjs" className="stack-icon" />
                <StackIcon name="swift" className="stack-icon" />
                <StackIcon name="tailwindcss" className="stack-icon" />
                <StackIcon name="postman" className="stack-icon" />
                <StackIcon name="typescript" className="stack-icon" />
                <StackIcon name="figma" className="stack-icon" />
                <StackIcon name="firebase" className="stack-icon" />
                <StackIcon name="nodejs" className="stack-icon" />
            </div>

            <h2 className="centered-text">Machine learning</h2>
            <div className='icons'> 
                <StackIcon name="pytorch" className="stack-icon" />
                <img src={sclearn} alt="profile" className="stack-icon" />
            </div>
        </div>
    );
};

export default Home;
