import React from "react";
import { motion } from "framer-motion";
import ProjectElement from "./ProjectElement/ProjectElement";
import myNewsWire from "./../assets/mynewswirethumbnail.jpg"; 
import RSDB from "./../assets/RSDB.png"; 
import cse20 from "./../assets/cse20thumbnail.gif"; 
import cogs107a from "./../assets/cogs107Athumbnail.gif";
import epinions from  "./../assets/epinionsthumbnail.jpg"; 
import './Projects.css';

const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Projects = () => {
    const projectsData = [
        {
            category: "Course concept maps",
            projects: [
                {
                    image: cse20,
                    name: "CSE 20",
                    shortDescription: "",
                    link: "/misc/cse20",
                    keywords: ["course map", "discrete math", "proofs"]
                },
                {
                    image: "https://lh3.googleusercontent.com/iZwB2p3rX7D7h-4QWSmKXy-_4FBRVCB8A8vrGwQduZzqfU-1ZMewoumgw3HOTiOsrN3Ax_vnOuUGRFnWuIbGoOWpAnpCoxGqvxg",
                    name: "CSE 101",
                    shortDescription: "",
                    link: "/misc/cse20",
                    keywords: ["course map", "algorithms"]
                },
                {
                    image: cogs107a,
                    name: "COGS 107A",
                    shortDescription: "",
                    link: "https://www.canva.com/design/DAGbfErBzVw/fuuDI_q8lPQpraYUFEDCfw/view?utm_content=DAGbfErBzVw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h08dfbf0273",
                    keywords: ["course map", "neurosci"]
                }
            ]
        },
        {
            category: "ML",
            projects: [
                {
                    image: "https://assets3.cbsnewsstatic.com/hub/i/2017/10/17/15e5a319-1728-4485-8516-3b1682feb51c/171016-nasa-gravitational-waves-promo.gif?v=9e5c48f1b04ac2a564e8a4c51250ac89",
                    name: "SMASH-hack GW detector",
                    shortDescription: "A machine learning hackathon that focuses on using various models to detect gravitational waves from abnormal activities in the universe.",
                    link: "https://github.com/EliteApex/SMASH-hackathon?tab=readme-ov-file",
                    keywords: ["ML", "TS", "Transformer"]
                },
                {
                    image: RSDB,
                    name: "Recommendation for Business owners (RSDB)",
                    shortDescription: "A hybrid recommender system with collaborative filters and content-based filtering. The model uses features of locations, the interaction of location and user, and the temporal evolution of the interaction to predict a user's rating of a business.",
                    link: "https://github.com/KevinBian107/RSDB", 
                    keywords: ["ML", "TS", "Latent factor", "Markov", "Recommender System", "EDA"]
                },
                {
                    image: "https://camo.githubusercontent.com/8d3bc6e10c19d04d70ffa5682901e0b570c953125a4780b99702d4cd921e1485/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f31382f62312f37372f31386231373766363562643131313963653431313836643064303935393931302e676966",
                    name: "Campus Coffee Space Utilization",
                    shortDescription: "Cogs 13 final project. Study on Patterns in On-campus Coffee Shop: How Students Utilize the Space of Starbucks at UCSD Price Center.",
                    link: "https://github.com/rcwoshimao/Campus-Coffee-Space-Utilization", 
                    keywords: ["EDA", "Data analysis"]
                },
                {
                    image: epinions,
                    name: "Sentiment GDP analysis",
                    shortDescription: "Cogs 108 final project. Analysis on how consumer sentiment evolved in response to economic shifts.",
                    link: "https://github.com/rcwoshimao/sentiment-gdp-analysis", 
                    keywords: ["EDA", "HT", "Data analysis"]
                }
            ]
        },
        {
            category: "Web & Mobile",
            projects: [
                {
                    image: myNewsWire,
                    name: "MyNewsWire",
                    shortDescription: "My first ever hackathon project. I was invited to join by my dear friend Jacob.",
                    link: "https://devpost.com/software/mynewswire-45dlzk", 
                    keywords: ["Front end", "React.js"]
                }
            ]
        }
    ];

    return( 
        <motion.div className='projects' initial="hidden" animate="visible" variants={fadeInDown}>
            <h1>Projects</h1>

            {projectsData.map((category, index) => (
                <motion.div key={index} initial="hidden" animate="visible" variants={fadeInDown}>
                    <h2 className="centered-text">{category.category}</h2>
                    <div className="project-subdiv">
                        {category.projects.map((project, idx) => (
                            <motion.div key={idx} initial="hidden" animate="visible" variants={fadeInDown}>
                                <ProjectElement
                                    image={project.image}
                                    name={project.name}
                                    shortDescription={project.shortDescription}
                                    link={project.link}
                                    keywords={project.keywords}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

export default Projects;
