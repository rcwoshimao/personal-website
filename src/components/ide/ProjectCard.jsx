import './ProjectCard.css';

// Long runs of border characters; CSS clips them to whatever width/height the card ends up.
const DASHES = '-'.repeat(300);
const PIPES = '|\n'.repeat(200);

const slug = (s) => `#${s.toLowerCase().replace(/\s+/g, '-')}`;

// A project drawn as an ssh-keygen "randomart" style box:
// +---[ name ]-------+
// |  gif / text      |
// +--------[ time ]--+
const ProjectCard = ({ project }) => {
  const { image, name, shortDescription, link, keywords = [], time } = project;

  return (
    <a className="pbox" href={link} target="_blank" rel="noopener noreferrer">
      <div className="pbox-edge" aria-hidden="true">
        <span>+--[</span>
        <span className="pbox-title">{name}</span>
        <span>]</span>
        <span className="pbox-fill">{DASHES}</span>
        <span>+</span>
      </div>

      <div className="pbox-body">
        <span className="pbox-side pbox-side-left" aria-hidden="true">{PIPES}</span>
        <span className="pbox-side pbox-side-right" aria-hidden="true">{PIPES}</span>

        <h3 className="sr-only">{name}</h3>
        <img className="pbox-img" src={image} alt="" loading="lazy" />
        <p className="pbox-desc">{shortDescription}</p>
        <p className="pbox-tags">{keywords.map(slug).join(' ')}</p>
      </div>

      <div className="pbox-edge" aria-hidden="true">
        <span>+</span>
        <span className="pbox-fill">{DASHES}</span>
        <span>[</span>
        <span className="pbox-time">{time}</span>
        <span>]--+</span>
      </div>
    </a>
  );
};

export default ProjectCard;
