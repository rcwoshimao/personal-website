import './SymbolBox.css';

// Long runs of border characters; CSS clips them to whatever width/height the box ends up.
const DASHES = '-+*%$%*+'.repeat(40);
const PIPES = '|\n'.repeat(200);

// The logo's main colors, for giving neighbouring boxes different hover colors
export const BOX_ACCENTS = [1, 14, 11, 10, 15, 13].map((i) => `var(--logo-${i})`);

// An ssh-keygen "randomart" style box:
// +---[ title ]------+
// |  content         |
// +-------[ footer ]-+
// `title` is rendered as given (give it the pbox-title class); `footer` is optional.
// `accent` is the border color on hover (any CSS color); defaults to the theme accent.
const SymbolBox = ({ title, footer, accent, className = '', children }) => (
  <article className={`pbox ${className}`} style={accent ? { '--box-accent': accent } : undefined}>
    <div className="pbox-edge">
      <span aria-hidden="true">+--[</span>
      {title}
      <span aria-hidden="true">]</span>
      <span className="pbox-fill" aria-hidden="true">{DASHES}</span>
      <span aria-hidden="true">+</span>
    </div>

    <div className="pbox-body">
      <span className="pbox-side pbox-side-left" aria-hidden="true">{PIPES}</span>
      <span className="pbox-side pbox-side-right" aria-hidden="true">{PIPES}</span>
      {children}
    </div>

    <div className="pbox-edge" aria-hidden="true">
      <span>+</span>
      <span className="pbox-fill">{DASHES}</span>
      {footer ? (
        <>
          <span>[</span>
          <span className="pbox-footer">{footer}</span>
          <span>]--+</span>
        </>
      ) : (
        <span>+</span>
      )}
    </div>
  </article>
);

export default SymbolBox;
