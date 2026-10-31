import { tagSlug } from './tags';
import './ProjectCard.css';

// Long runs of border characters; CSS clips them to whatever width/height the card ends up.
const DASHES = '-+*%$%*+'.repeat(40);
const PIPES = '|\n'.repeat(200);

// A project drawn as an ssh-keygen "randomart" style box:
// +---[ name ]-------+
// |  gif / text      |
// +--------[ time ]--+
// The title link stretches over the whole box; tag buttons sit above it so they stay clickable.
const ProjectCard = ({ project, activeTag, onTag }) => {
  const { image, name, shortDescription, link, keywords = [], time } = project;

  return (
    <article className="pbox">
      <div className="pbox-edge">
        <span aria-hidden="true">+--[</span>
        <a className="pbox-title" href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
        <span aria-hidden="true">]</span>
        <span className="pbox-fill" aria-hidden="true">{DASHES}</span>
        <span aria-hidden="true">+</span>
      </div>

      <div className="pbox-body">
        <span className="pbox-side pbox-side-left" aria-hidden="true">{PIPES}</span>
        <span className="pbox-side pbox-side-right" aria-hidden="true">{PIPES}</span>

        <img className="pbox-img" src={image} alt="" loading="lazy" />
        <p className="pbox-desc">{shortDescription}</p>
        <p className="pbox-tags">
          {keywords.map((k) => (
            <button
              key={k}
              className={`pbox-tag ${activeTag === k ? 'is-active' : ''}`}
              onClick={() => onTag(k)}
            >
              #{tagSlug(k)}
            </button>
          ))}
        </p>
      </div>

      <div className="pbox-edge" aria-hidden="true">
        <span>+</span>
        <span className="pbox-fill">{DASHES}</span>
        <span>[</span>
        <span className="pbox-time">{time}</span>
        <span>]--+</span>
      </div>
    </article>
  );
};

export default ProjectCard;
