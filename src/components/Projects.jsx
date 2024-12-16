import React from "react";
import ProjectElement from "./ProjectElement/ProjectElement";
import './Projects.css'; 
const Projects = () => {
    return(
        <div className='projects'>
            <h1>Projects </h1>
            <ProjectElement/> 
            <ProjectElement /> 
        </div>
    ); 

}
export default Projects; 