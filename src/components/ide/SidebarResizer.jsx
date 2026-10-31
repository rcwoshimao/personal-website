import { useRef } from 'react';

export const SIDEBAR_DEFAULT = 250;
const MIN = 180;
const MAX = 480;
const STEP = 10;

const clamp = (w) => Math.min(MAX, Math.max(MIN, w));

// Drag handle on the sidebar's right edge (desktop only). Drag to resize between MIN and MAX,
// arrow keys nudge it, double-click resets it.
const SidebarResizer = ({ width, onResize }) => {
  const dragging = useRef(false);

  const handlePointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.classList.add('is-resizing');
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    const left = e.currentTarget.parentElement.getBoundingClientRect().left;
    onResize(clamp(e.clientX - left));
  };

  const stopDragging = () => {
    dragging.current = false;
    document.body.classList.remove('is-resizing');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') onResize(clamp(width - STEP));
    if (e.key === 'ArrowRight') onResize(clamp(width + STEP));
  };

  return (
    <div
      className="ide-resizer"
      role="separator"
      aria-orientation="vertical"
      aria-label="resize explorer"
      aria-valuenow={width}
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onKeyDown={handleKeyDown}
      onDoubleClick={() => onResize(SIDEBAR_DEFAULT)}
    />
  );
};

export default SidebarResizer;
