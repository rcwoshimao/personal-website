import { useEffect, useState } from 'react';
import { usePlayOnce, prefersReducedMotion } from './usePlayOnce';
import Prompt from './Prompt';
import ShellInput from './ShellInput';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../personal-data';
import { tagSlug, collectTags } from './tags';
import './ProjectsTerminal.css';

const TAGS = collectTags(projectsData);

const commandFor = (tag) => (tag ? `ls --tag=${tagSlug(tag)}` : 'ls');

const ProjectsTerminal = () => {
  // The first `ls` only types itself out once per page load
  const skip = usePlayOnce('projects');
  const [reducedMotion] = useState(prefersReducedMotion);
  const [tag, setTag] = useState(null);
  const command = commandFor(tag);
  const [typed, setTyped] = useState(skip ? command.length : 0);
  const done = typed >= command.length;

  // Type the current command one character at a time
  useEffect(() => {
    if (done) return;
    const delay = typed === 0 ? 200 : tag ? 35 : 80;
    const id = setTimeout(() => setTyped(typed + 1), delay);
    return () => clearTimeout(id);
  }, [typed, done, tag]);

  // Picking a tag rewrites the command and "runs" it again; picking it twice clears it
  const filterBy = (next) => {
    const nextTag = next === tag ? null : next;
    setTag(nextTag);
    setTyped(reducedMotion ? commandFor(nextTag).length : 0);
  };

  const projects = tag ? projectsData.filter((p) => p.keywords?.includes(tag)) : projectsData;

  return (
    <>
      <div className="ide-line ls-filter">
        <span className="ls-comment"># filter:</span>
        <button
          className={`ls-flag ${tag === null ? 'is-active' : ''}`}
          onClick={() => filterBy(null)}
        >
          [all]
        </button>
        {TAGS.map((t) => (
          <button
            key={t}
            className={`ls-flag ${tag === t ? 'is-active' : ''}`}
            onClick={() => filterBy(t)}
          >
            [{tagSlug(t)}]
          </button>
        ))}
      </div>

      <Prompt path="projects" cursor={!done} status={done ? 'ok' : undefined}>
        {command.slice(0, typed)}
      </Prompt>

      {done && (
        <>
          <ul className="ls-output">
            {projects.map((project) => (
              <li key={project.name}>
                <ProjectCard project={project} activeTag={tag} onTag={filterBy} />
              </li>
            ))}
          </ul>
          <ShellInput path="projects" />
        </>
      )}
    </>
  );
};

export default ProjectsTerminal;
