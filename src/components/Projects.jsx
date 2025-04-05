import React from "react";
import ProjectsList from "./ProjectElements/ProjectList";
import './Projects.css';

const Projects = () => {
    return( 
        <div className='projects'> 
        <h1 className='centered-text'> Course concept maps </h1>
        <h3 className='centered-text'> A summary of my irrational euphoria for computational concepts. (Occationally going crazy for some other stuff.) </h3>
       <ProjectsList className="projects" selectedProjects={["CSE 20", "CSE 101", "COGS 107A" ]} /> 
       <h1 className='centered-text' > ML </h1>
       <ProjectsList className="projects" selectedProjects={["SMASH-hack GW detector", "Recommendation for Business owners (RSDB)", "Campus Coffee Space Utilization", "Sentiment GDP analysis"]} /> 
       <h1 className='centered-text' > Web </h1>
       <ProjectsList className="projects" selectedProjects={["MyNewsWire"]} /> 

       </div>
    );
}
export default Projects;
