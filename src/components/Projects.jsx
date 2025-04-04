import React from "react";
import ProjectsList from "./ProjectElements/ProjectList";
import './Projects.css';

const Projects = () => {
    return( 
       <ProjectsList className="projects"  selectedProjects={["CSE 20", "SMASH-hack GW detector"]} /> 
    );
}
export default Projects;
