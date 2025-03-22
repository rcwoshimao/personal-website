import React from "react";
import ProjectElement from "./ProjectElement/ProjectElement";
import myNewsWire from "./../assets/mynewswirethumbnail.jpg"; 
import SmashHack25 from "./../assets/smashhack25thumbnail.png"; 
import RSDB from "./../assets/RSDB.png"; 
import cse20 from "./../assets/cse20thumbnail.png"; 
import cogs107a from "./../assets/cogs107Athumbnail.png"
import Nav from "./Nav";

import './Projects.css'; 
//import { Link } from "react-router-dom";
const Projects = () => {
    return(
        /*const ProjectElement = ({image, name, description, thumbnail, link}) */
        <div className='projects'>
            <h1>Projects </h1>

            <h2> Machine learning </h2>
            <div className='project-subdiv'>
            <ProjectElement image={SmashHack25} name={"SMASH-hack GW detector"} shortDescription="A machine learning hackathon that focuses on using various models to detect gravitational waves from abnormal activities in the universe." link={"https://devpost.com/software/mynewswire-45dlzk"}/> 

            <ProjectElement image={RSDB} name={"Recommendation based on Sequential Dynamics for Business owners (RSDB)"} shortDescription="A hybrid recommender system with collaborative filters and content-based filtering. The model will use features of locations, the interaction of location and user, and the temporal evolution of the interaction to predict a user's rating of a business." link={"https://github.com/KevinBian107/RSDB"} /> 
            </div> 
            
            
            <h2> Web development</h2>
            <div className='project-subdiv'>
            <ProjectElement image={myNewsWire} name={"MyNewsWire"} shortDescription="My first ever hackathon project. I was invited to join by my dear friend Jacob Root. " link={"https://devpost.com/software/mynewswire-45dlzk"}/> 

            </div>

            <h2> Course concept maps </h2>
            <h3> I've taken quite some interesting courses at UCSD. When the content is either interesting or rigid enough, and if the structure those course material can be intuitively represented visually, I creat concept maps for them. There can be mistakes in them, but I am proud of them nonetheless. Please contact me if you see any mistakes! Note: The material here are created according to the curriculums at UCSD, from 2022- 2026. There might be more than one way to define things! </h3> 
            
            <ProjectElement image={cse20} name={"CSE 20 concept map"} shortDescription="" link="/misc/cse20" /> 
            
            <ProjectElement image={cse20} name={"CSE 101"} shortDescription="" link="/misc/cse20" /> 

            <ProjectElement image={cogs107a} name={"COGS 107A"} shortDescription="" link="https://www.canva.com/design/DAGbfErBzVw/fuuDI_q8lPQpraYUFEDCfw/view?utm_content=DAGbfErBzVw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h08dfbf0273" /> 
            <br/> 


            


        </div>
    ); 

}
export default Projects; 