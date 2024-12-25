import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Zoom } from '@vx/zoom';
import { localPoint } from '@vx/event';
import { RectClipPath } from '@vx/clip-path';
import './ConceptMap.css'; 

/* https://vx-demo.vercel.app/zoom-i */ 

const bg = '#0a0a0a';

const initialTransform = {
  scaleX: 0.3,
  scaleY: 0.3,
  translateX: -200,
  translateY: -150,
  skewX: 0,
  skewY: 0,
};

function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Calculate navbar height on component mount
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight); // Get navbar height
    }
  }, [location]); // Dependency on location to re-calculate navbar height on route change

  return navbarHeight;
}

export default function ConceptMap({ imageSrc }) {
  const navbarHeight = useNavbarHeight();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - navbarHeight,
  });

  
  const [showMiniMap, setShowMiniMap] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - navbarHeight,
      });
    };

    // Initial window size adjustment
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navbarHeight]); // Dependency on navbarHeight to adjust window size

  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [imageSrc]);

  const { width: imageWidth, height: imageHeight } = imageDimensions;
  

  return (
    <Zoom
      width={windowSize.width}
      height={windowSize.height}
      scaleXMin={0.1}
      scaleXMax={1.5}
      scaleYMin={0.1}
      scaleYMax={1.5}
      transformMatrix={initialTransform}
    >
      {zoom => (
        <div className="relative" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg
            width={windowSize.width}
            height={windowSize.height}
            style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}
          >
            <RectClipPath id="zoom-clip" width={windowSize.width} height={windowSize.height} />
            <rect width={windowSize.width} height={windowSize.height} fill={bg} style={{ borderRadius: 0 }} />
            <g transform={zoom.toString()}>
              <image
                href={imageSrc}
                
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
            <rect
              width={windowSize.width}
              height={windowSize.height}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={event => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            />
            {showMiniMap && (
              <g
                clipPath="url(#zoom-clip)"
                transform={`
                  scale(0.25)
                  translate(${windowSize.width * 4 - windowSize.width - 60}, ${windowSize.height * 4 - windowSize.height - 60})
                `}
              >
                <rect width={imageWidth} height={imageHeight} fill="#1a1a1a" />
                <image
                  href={imageSrc}
                  width={windowSize.width}
                  height={windowSize.height}
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect
                  width={imageWidth}
                  height={imageHeight}
                  fill="blue"
                  fillOpacity={0.5}
                  stroke="blue"
                  strokeWidth={2}
                  transform={zoom.toStringInvert()}
                />
              </g>
            )}
          </svg>

          <div className="controls" style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
            <button
              className="btn btn-zoom"
              onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
            >
              +
            </button>
            <button
              className="btn btn-zoom btn-bottom"
              onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
            >
              -
            </button>
            <button className="btn btn-lg" onClick={zoom.reset}>
              Reset
            </button>
            <button className="btn btn-lg" onClick={() => setShowMiniMap(!showMiniMap)}>
              {showMiniMap ? 'Hide' : 'Show'} Mini Map
            </button>
          </div>
          <div className="mini-map" style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 100 }}>
          </div>
        </div>
      )}
    </Zoom>
  );
}
