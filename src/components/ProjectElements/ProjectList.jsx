import React from "react";
import { motion } from "framer-motion";
import ProjectElement from "./ProjectElement";
import { projectsData } from "./../../personal-data"; // Import the projects data
import "./ProjectList.css"; 

const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectsList = ({ selectedProjects = [], selectedKeywords=[]}) => {
  // Flatten projectsData (removing categories) and filter based on selectedProjects
  const filteredProjects = projectsData.filter(
    (project) => {
      const matcheshName = selectedProjects.length === 0 || selectedProjects.includes(project.name); 
      const matchesKeywords = selectedKeywords.length === 0 || project.keywords?.some((keyword) => selectedKeywords.includes(keyword));
    return matchesKeywords && matcheshName; 
    }
  );


  return (
    <div className="project-list">
      {filteredProjects.map((project, index) => (
        <motion.div key={index} initial="hidden" animate="visible" variants={fadeInDown}>
          <ProjectElement
            image={project.image}
            name={project.name}
            shortDescription={project.shortDescription}
            link={project.link}
            keywords={project.keywords}
            time={project.time}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsList;
