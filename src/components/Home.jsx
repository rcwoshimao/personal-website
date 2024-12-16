import React from "react";
import Typewriter from "react-typewriter-effect";
import './Home.css'; 
import './../App.css'; 
import pfp from './../assets/pfp.jpeg';
import sclearn from './../assets/scikit-learn.png';
import StackIcon from "tech-stack-icons";

const Home = () => {
    return (
        <div className="home">
            <div className="about-me">
                <div className="about-me-children">
                    <img src={pfp} alt="profile" />
                </div>
                <div className="about-me-children">
                    <h1>
                        <Typewriter
                            text="About me"
                            cursor=""
                            typeSpeed={50} 
                            hideCursorAfterText={true} 
                        />
                    </h1>
                    <p>
                        <Typewriter
                            text="Hi! My name is Rebecca Chen. I am an undergraduate student at UCSD majoring in Cognitive Science and minoring in Computer Science. My field of interest spans from Machine Learning to web development."
                            cursor=""
                            typeSpeed={5} 
                            hideCursorAfterText={true} 
                        />
                    </p>
                </div>
            </div>
                <h1 className="centered-text">
                    <Typewriter
                        text="Techstacks"
                        cursor=""
                        typeSpeed={50} 
                        hideCursorAfterText={true} 
                        className="centered-text"
                    />
                </h1>
                <h2>
                    <Typewriter
                        text="General"
                        cursor=""
                        typeSpeed={50} 
                        hideCursorAfterText={true} 
                        className="centered-text"
                    />
                </h2>
                <StackIcon name="c++" className="stack-icon" />
                <StackIcon name="python" className="stack-icon" />
                <StackIcon name="java" className="stack-icon" />
                <StackIcon name="streamlit" className="stack-icon" />
                <StackIcon name="vscode" className="stack-icon" />
                <StackIcon name="neovim" className="stack-icon" />

                <h2>
                    <Typewriter
                        text="Web and mobile development"
                        className="centered-text"
                        cursor=""
                        typeSpeed={50} 
                        hideCursorAfterText={true}
                    />
                </h2>
                
                <StackIcon name="reactjs" className="stack-icon" />
                <StackIcon name="swift" className="stack-icon" />
                <StackIcon name="tailwindcss" className="stack-icon" />
                <StackIcon name="postman" className="stack-icon" />
                <StackIcon name="typescript" className="stack-icon" />
                <StackIcon name="figma" className="stack-icon" />
                <StackIcon name="firebase" className="stack-icon" />
                <StackIcon name="nodejs" className="stack-icon" />

                <h2>
                    <Typewriter
                        text="Machine learning"
                        cursor=""
                        typeSpeed={50} 
                        hideCursorAfterText={true} 
                        className="centered-text"
                    />
                </h2>
                <StackIcon name="pytorch" className="stack-icon" />
                <img src={sclearn} alt="profile" className="stack-icon" />

                <h1 className="centered-text">
                    <Typewriter
                        text="Connect with me"
                        cursor=""
                        typeSpeed={50} 
                        hideCursorAfterText={true}
                        className="centered-text"
                    />
                </h1>
            </div>
    );
};

export default Home;
