import React from "react";
import { Link } from "react-router-dom";
import "./ProjectElement.css"; 
import testImage from './../../assets/test.jpg'; 

const ProjectElement = ({ image, name, shortDescription, description, link }) => {
    return (
        <div className='project-element'>
            <img src={image || testImage} alt=""></img>
            <h1>{name || "Project name"}</h1>
            <p>
                {shortDescription || "default description"}
            </p>
            {link ? (
                <Link to={link}>
                    <button className="view-more-button">View More &gt;&gt; </button>
                </Link>
            ) : (
                <button className="view-more-button" disabled>View More &gt;&gt; </button>
            )}
        </div>
    );
};

export default ProjectElement;
