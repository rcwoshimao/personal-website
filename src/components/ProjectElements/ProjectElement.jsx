import React from "react";
import "./ProjectElement.css"; 
import testImage from "./../../assets/test.jpg"; 

const KeywordDisplay = ({keywords}) => {
    if (keywords.length === 0) return null;
    return (
      <p className="project-keywords font-bold" style={{color: 'grey'}}>
        {keywords.join(" | ")}
      </p>
    );
  };

const ProjectElement = ({ image, name, shortDescription, link, keywords, time }) => {
    return (
        <div className='project-element'>
            <img src={image || testImage} alt="" />
            <h2 className="project-title">{name || "Project name"}</h2>
            <h3>{time || "Project time"}</h3>
            <KeywordDisplay keywords={keywords || []}/>
            <p className="project-description">{shortDescription || ""}</p>
            {link ? (
                <a rel="noreferrer" target="_blank" href={link}>
                    <button className="view-more-button">View Project &gt;&gt; </button>
                </a>
            ) : (
                <button className="view-more-button" disabled>View Project &gt;&gt; </button>
            )}
        </div>
    );
};

export default ProjectElement;