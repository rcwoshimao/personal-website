import { useEffect, useState } from 'react';
import Prompt from './Prompt';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../personal-data';
import './ProjectsTerminal.css';

const COMMAND = 'ls';

// Like home, the typing animation only plays the first time per page load.
let hasRun = false;

const ProjectsTerminal = () => {
  const [skip] = useState(
    () => hasRun || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [typed, setTyped] = useState(skip ? COMMAND.length : 0);
  const done = typed === COMMAND.length;

  useEffect(() => {
    if (skip) return;
    hasRun = true;

    const timers = [];
    let t = 200;
    for (let i = 1; i <= COMMAND.length; i++) {
      t += 80;
      timers.push(setTimeout(() => setTyped(i), t));
    }
    return () => timers.forEach(clearTimeout);
  }, [skip]);

  return (
    <>
      <Prompt path="projects" cursor={!done}>
        {COMMAND.slice(0, typed)}
      </Prompt>

      {done && (
        <>
          <ul className="ls-output">
            {projectsData.map((project) => (
              <li key={project.name}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
          <Prompt path="projects" />
        </>
      )}
    </>
  );
};

export default ProjectsTerminal;
