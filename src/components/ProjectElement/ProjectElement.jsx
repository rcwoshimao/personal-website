import React from "react";
import "./ProjectElement.css"; 
import testImage from './../../assets/test.jpg'; 
const ProjectElement = ({name, description, thumbnail, link}) => {
    return(
    <div className='project-element'>
        <img src={testImage} alt=""></img>
        <h1> {name|| "Project name"} </h1>
        <p> 
            {description || "default description"}
        </p>
    </div>
    ); 
}

export default ProjectElement; 