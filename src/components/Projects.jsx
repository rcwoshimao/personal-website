import React from "react";
import ProjectsList from "./ProjectElements/ProjectList";
import './Projects.css';

const Projects = () => {
    return( 
        <div className='projects'> 
        <h1 className='centered-text'> Course concept maps </h1>
        <h3 className='centered-text'> A summary of my irrational euphoria for computational concepts. (Occationally going crazy for some other stuff.) </h3>
       <ProjectsList className="projects" /> 
       </div>
    );
}
export default Projects;
