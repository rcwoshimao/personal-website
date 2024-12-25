import React from "react";
import ProjectElement from "./ProjectElement/ProjectElement";
import myNewsWire from "./../assets/mynewswirethumbnail.jpg"; 
import './Projects.css'; 
const Projects = () => {
    return(
        /*const ProjectElement = ({image, name, description, thumbnail, link}) */
        <div className='projects'>
            <h1>Projects </h1>
            <h2> Web development</h2>
            <ProjectElement image={myNewsWire} name={"MyNewsWire"} shortDescription="Customized News in one click" link={"https://devpost.com/software/mynewswire-45dlzk"}/> 
            <ProjectElement /> 
            <h2> Machine learning </h2>
        </div>
    ); 

}
export default Projects; 