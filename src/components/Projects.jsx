import React, { useState } from "react";
import ProjectsList from "./ProjectElements/ProjectList";
import { projectsData } from "../personal-data";
import './Projects.css';

const getAllKeywords = (projects) => {
  const keywordSet = new Set();
  projects.forEach((proj) => proj.keywords?.forEach((k) => keywordSet.add(k)));
  return Array.from(keywordSet);
};

const Projects = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const allKeywords = getAllKeywords(projectsData);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  return (
    <div className='projects'> 
      <h1 className='centered-text'>Course Concept Maps</h1>
      <h3 className='centered-text'>
        A summary of my irrational euphoria for computational concepts. (Occasionally going crazy for some other stuff.)
      </h3>

      <div className="keyword-filters">
        {allKeywords.map((keyword) => (
          <button
            key={keyword}
            className={`keyword-button ${selectedKeywords.includes(keyword) ? 'selected' : ''}`}
            onClick={() => toggleKeyword(keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>

      <ProjectsList selectedKeywords={selectedKeywords} />
    </div>
  );
};

export default Projects;
