import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectElement.css"; 
import testImage from './../../assets/test.jpg'; 

const ProjectElement = ({ image, name, shortDescription, description, link }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='project-element'>
            <img src={image || testImage} alt="" />
            <h1>{name || "Project name"}</h1>
            <p className={isExpanded ? "" : "project-description"}>
                {shortDescription || "default description"}
            </p>
            <button 
                className="toggle-description-button" 
                onClick={toggleDescription}
            >
                {isExpanded ? "Show Less" : "Read More"}
            </button>
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
