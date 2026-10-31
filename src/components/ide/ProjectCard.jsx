import { tagSlug } from './tags';
import SymbolBox from './SymbolBox';
import './ProjectCard.css';

// A project in a symbol box: gif, description and tags, with its date in the footer.
// The title link stretches over the whole box; tag buttons sit above it so they stay clickable.
const ProjectCard = ({ project, activeTag, onTag }) => {
  const { image, name, shortDescription, link, keywords = [], time } = project;

  return (
    <SymbolBox
      footer={time}
      title={
        <a className="pbox-title" href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      }
    >
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
    </SymbolBox>
  );
};

export default ProjectCard;
