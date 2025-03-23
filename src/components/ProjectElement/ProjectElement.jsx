import React from "react";
import { Link } from "react-router-dom";
import "./ProjectElement.css"; 
import testImage from "./../../assets/test.jpg"; 

const KeywordDisplay = ({ keyword1, keyword2, keyword3 }) => {
    if (!keyword1 || !keyword2 || !keyword3) return null;
    return (
      <p className="keyword font-bold">
        {keyword1} | {keyword2} | {keyword3}
      </p>
    );
  };

const ProjectElement = ({ image, name, shortDescription, link, keywords }) => {
    return (
        <div className='project-element'>
            <img src={image || testImage} alt="" />
            <h2 className="project-title">{name || "Project name"}</h2>
            <KeywordDisplay keyword1="Keyword1" keyword2="Keyword2" keyword3="Keyword3" />
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