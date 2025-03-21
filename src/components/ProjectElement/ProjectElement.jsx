import React from "react";
import { Link } from "react-router-dom";
import "./ProjectElement.css"; 
import testImage from "./../../assets/test.jpg"; 

const ProjectElement = ({ image, name, shortDescription, link }) => {
    return (
        <div className='project-element'>
            <img src={image || testImage} alt="" />
            <h2 className="project-title">{name || "Project name"}</h2>
            <p className="project-description">{shortDescription || ""}</p>
            {link ? (
                <a rel="noreferrer" target="_blank" href={link}>
                    <button className="view-more-button">View More &gt;&gt; </button>
                </a>
            ) : (
                <button className="view-more-button" disabled>View More &gt;&gt; </button>
            )}
        </div>
    );
};

export default ProjectElement;