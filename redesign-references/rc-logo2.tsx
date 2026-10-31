'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

// Compact cell format: [x, y, char, colorIndex, bgColorIndex?]
type CellData = (number | string)[];

type Frame = {
  duration: number;
  cells: CellData[];
};

type AsciiMotionComponentProps = {
  showControls?: boolean;
  autoPlay?: boolean;
  onReady?: (api: {
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    restart: () => void;
  }) => void;
};

const COLORS: string[] = ["#000000","#00FFFF","#33FFFF","#66CCCC","#66CCFF","#66FFCC","#9999CC","#99CC99","#CCCCFF","#FF00FF","#FF66CC","#FF9999","#FFCC66","#FFCC99","#FFCCFF","#FFFF66"];

const FRAMES: Frame[] = [{"duration":83.33333333333333,"cells":[[16,2,"⣀",0],[15,3,"⢰",0],[16,3,"⣶",14],[17,3,"⡆",14],[15,4,"⠈",0],[16,4,"⠉",0],[17,4,"⠁",0],[8,6,"⢀",0],[9,6,"⣀",0],[10,6,"⡀",0],[8,7,"⠸",15],[9,7,"⠿",15],[10,7,"⠇",0],[8,8,"⠈",0],[9,8,"⠁",0],[16,9,"⢀",0],[17,9,"⣀",0],[18,9,"⣀",11],[19,9,"⣀",0],[20,9,"⡀",0],[8,10,"⢀",0],[9,10,"⣀",0],[10,10,"⣀",0],[11,10,"⣀",0],[12,10,"⣀",0],[13,10,"⣀",0],[14,10,"⣀",0],[15,10,"⣀",0],[16,10,"⣰",11],[17,10,"⣿",11],[18,10,"⣿",11],[19,10,"⣿",1],[20,10,"⣆",1],[21,10,"⡀",0],[8,11,"⢸",0],[9,11,"⣿",15],[10,11,"⣿",15],[11,11,"⣿",15],[12,11,"⣿",15],[13,11,"⣿",15],[14,11,"⡿",15],[15,11,"⣿",11],[16,11,"⣿",11],[17,11,"⣿",11],[18,11,"⣿",1],[19,11,"⣿",1],[20,11,"⣿",14],[21,11,"⣷",14],[22,11,"⡆",0],[8,12,"⢸",0],[9,12,"⣿",15],[10,12,"⣿",15],[11,12,"⡟",15],[12,12,"⠉",0],[13,12,"⠉",0],[14,12,"⠉",0],[15,12,"⠉",0],[16,12,"⠉",0],[17,12,"⠉",0],[18,12,"⠉",0],[19,12,"⢻",14],[20,12,"⣿",14],[21,12,"⣿",14],[22,12,"⡇",0],[8,13,"⢸",0],[9,13,"⣿",15],[10,13,"⣿",15],[11,13,"⡇",15],[19,13,"⢸",14],[20,13,"⣿",14],[21,13,"⣿",14],[22,13,"⡇",0],[8,14,"⢸",0],[9,14,"⣿",15],[10,14,"⣿",15],[11,14,"⡇",15],[19,14,"⢸",14],[20,14,"⣿",14],[21,14,"⣿",1],[22,14,"⡇",0],[33,14,"⢀",0],[34,14,"⣠",11],[35,14,"⣀",0],[36,14,"⡀",0],[8,15,"⢸",0],[9,15,"⣿",15],[10,15,"⡿",15],[11,15,"⡇",11],[19,15,"⢸",8],[20,15,"⣿",1],[21,15,"⣿",1],[22,15,"⡇",0],[33,15,"⠸",11],[34,15,"⣿",11],[35,15,"⡿",11],[36,15,"⠇",0],[8,16,"⢸",0],[9,16,"⡿",15],[10,16,"⣿",11],[11,16,"⡇",11],[19,16,"⢸",1],[20,16,"⣿",1],[21,16,"⣿",1],[22,16,"⡇",0],[33,16,"⠈",0],[34,16,"⠉",0],[35,16,"⠁",0],[8,17,"⢸",0],[9,17,"⣿",11],[10,17,"⣿",11],[11,17,"⡇",1],[19,17,"⢸",1],[20,17,"⣿",1],[21,17,"⣿",1],[22,17,"⡇",0],[8,18,"⢸",0],[9,18,"⣿",11],[10,18,"⣿",1],[11,18,"⣷",1],[12,18,"⣶",14],[13,18,"⣶",14],[14,18,"⣶",14],[15,18,"⣶",14],[16,18,"⣶",8],[17,18,"⣶",1],[18,18,"⣶",1],[19,18,"⣾",1],[20,18,"⣿",1],[21,18,"⡿",1],[22,18,"⠇",0],[8,19,"⢸",0],[9,19,"⣿",1],[10,19,"⣿",1],[11,19,"⣿",14],[12,19,"⠿",14],[13,19,"⠿",14],[14,19,"⢿",14],[15,19,"⣿",2],[16,19,"⣿",1],[17,19,"⡿",1],[18,19,"⠿",1],[19,19,"⠿",1],[20,19,"⠿",1],[21,19,"⠏",10],[22,19,"⠁",0],[28,19,"⢀",0],[29,19,"⣴",11],[30,19,"⣶",11],[31,19,"⣄",11],[32,19,"⡀",0],[8,20,"⢸",0],[9,20,"⣿",1],[10,20,"⣿",14],[11,20,"⡏",14],[12,20,"⠉",0],[13,20,"⠉",0],[14,20,"⢸",1],[15,20,"⣿",1],[16,20,"⣿",1],[17,20,"⡇",0],[18,20,"⠉",0],[19,20,"⠉",0],[20,20,"⠉",0],[21,20,"⠁",0],[22,20,"⢀",0],[23,20,"⣀",0],[24,20,"⣤",10],[25,20,"⣠",10],[26,20,"⣤",15],[27,20,"⣤",12],[28,20,"⣴",11],[29,20,"⣿",11],[30,20,"⣿",11],[31,20,"⣿",1],[32,20,"⣦",1],[33,20,"⣤",1],[34,20,"⣤",1],[35,20,"⣄",1],[36,20,"⡀",0],[8,21,"⢸",0],[9,21,"⣿",14],[10,21,"⣿",14],[11,21,"⡇",14],[14,21,"⢸",1],[15,21,"⣿",1],[16,21,"⣿",1],[17,21,"⡇",0],[22,21,"⠰",0],[23,21,"⢿",10],[24,21,"⣿",10],[25,21,"⣾",15],[26,21,"⡿",15],[27,21,"⣿",11],[28,21,"⣿",11],[29,21,"⣿",11],[30,21,"⣿",1],[31,21,"⣿",1],[32,21,"⣿",1],[33,21,"⣿",1],[34,21,"⣿",1],[35,21,"⡿",1],[36,21,"⠇",0],[8,22,"⢸",0],[9,22,"⣿",14],[10,22,"⣿",14],[11,22,"⡇",14],[14,22,"⢸",1],[15,22,"⣿",1],[16,22,"⣿",1],[17,22,"⡇",0],[23,22,"⢸",10],[24,22,"⣾",15],[25,22,"⡿",13],[26,22,"⠉",0],[27,22,"⠉",0],[28,22,"⠉",0],[29,22,"⠉",0],[30,22,"⠉",0],[31,22,"⠉",0],[32,22,"⠉",0],[33,22,"⠉",0],[34,22,"⠉",0],[35,22,"⠉",0],[36,22,"⠁",0],[8,23,"⢸",0],[9,23,"⣿",14],[10,23,"⣿",14],[11,23,"⡇",1],[14,23,"⢸",1],[15,23,"⣿",1],[16,23,"⡿",4],[17,23,"⣇",10],[18,23,"⡀",0],[23,23,"⢸",15],[24,23,"⡿",11],[25,23,"⣿",11],[26,23,"⡇",0],[8,24,"⢸",0],[9,24,"⣿",14],[10,24,"⣿",1],[11,24,"⡇",1],[14,24,"⢸",1],[15,24,"⡿",6],[16,24,"⣿",10],[17,24,"⣿",10],[18,24,"⣷",10],[19,24,"⡆",0],[23,24,"⢹",11],[24,24,"⣿",11],[25,24,"⣿",11],[26,24,"⡇",0],[8,25,"⢸",0],[9,25,"⣿",1],[10,25,"⣿",1],[11,25,"⡇",1],[14,25,"⢸",10],[15,25,"⣿",10],[16,25,"⣿",10],[17,25,"⠿",10],[18,25,"⠏",9],[19,25,"⠁",0],[23,25,"⢸",11],[24,25,"⣿",11],[25,25,"⣿",3],[26,25,"⡇",0],[8,26,"⢸",0],[9,26,"⣿",1],[10,26,"⣿",1],[11,26,"⡇",1],[14,26,"⢸",10],[15,26,"⣿",10],[16,26,"⣿",10],[17,26,"⡇",0],[23,26,"⢸",11],[24,26,"⣿",2],[25,26,"⣿",1],[26,26,"⡇",0],[8,27,"⢸",0],[9,27,"⣿",1],[10,27,"⣿",1],[11,27,"⡇",1],[14,27,"⢸",10],[15,27,"⣿",10],[16,27,"⣿",10],[17,27,"⡇",0],[22,27,"⢀",0],[23,27,"⣸",1],[24,27,"⣿",1],[25,27,"⣿",1],[26,27,"⣄",0],[27,27,"⣀",0],[28,27,"⣀",0],[29,27,"⣀",0],[30,27,"⣀",0],[31,27,"⣀",0],[32,27,"⣀",0],[33,27,"⣀",0],[34,27,"⣀",0],[35,27,"⣀",0],[36,27,"⣀",0],[37,27,"⣀",0],[38,27,"⡀",0],[8,28,"⢸",0],[9,28,"⣿",1],[10,28,"⣿",1],[11,28,"⡇",10],[14,28,"⢸",10],[15,28,"⣿",10],[16,28,"⣿",10],[17,28,"⡇",0],[22,28,"⢸",0],[23,28,"⣿",1],[24,28,"⣿",1],[25,28,"⣿",1],[26,28,"⣿",1],[27,28,"⣿",1],[28,28,"⣿",1],[29,28,"⣿",1],[30,28,"⣿",1],[31,28,"⣿",13],[32,28,"⣿",13],[33,28,"⣿",13],[34,28,"⣿",13],[35,28,"⣿",14],[36,28,"⣿",14],[37,28,"⣿",14],[38,28,"⠆",0],[8,29,"⠸",0],[9,29,"⠿",1],[10,29,"⣿",10],[11,29,"⠇",10],[14,29,"⢸",10],[15,29,"⣿",10],[16,29,"⣴",13],[17,29,"⡇",0],[22,29,"⠈",0],[23,29,"⠉",0],[24,29,"⠉",0],[25,29,"⠉",0],[26,29,"⠉",0],[27,29,"⠉",0],[28,29,"⠉",0],[29,29,"⠉",0],[30,29,"⠉",0],[31,29,"⠉",0],[32,29,"⠉",0],[33,29,"⠉",0],[34,29,"⠉",0],[35,29,"⠉",0],[36,29,"⠉",0],[37,29,"⠉",0],[38,29,"⠁",0],[9,30,"⠈",0],[10,30,"⠉",0],[11,30,"⠁",0],[14,30,"⢸",10],[15,30,"⣼",15],[16,30,"⣿",15],[17,30,"⡇",0],[14,31,"⢸",15],[15,31,"⣿",15],[16,31,"⣿",11],[17,31,"⣷",11],[18,31,"⣶",11],[19,31,"⣶",1],[20,31,"⣶",1],[21,31,"⣶",1],[22,31,"⣶",1],[23,31,"⣶",1],[24,31,"⣶",1],[25,31,"⣶",1],[26,31,"⣶",1],[27,31,"⣶",5],[28,31,"⣶",13],[29,31,"⣶",13],[30,31,"⣶",13],[31,31,"⣶",13],[32,31,"⣶",14],[33,31,"⣶",14],[34,31,"⣶",14],[35,31,"⣶",14],[36,31,"⣶",14],[37,31,"⣶",14],[38,31,"⣶",14],[39,31,"⣶",14],[40,31,"⣶",14],[41,31,"⣶",14],[42,31,"⣶",14],[43,31,"⡆",14],[14,32,"⠸",0],[15,32,"⠿",11],[16,32,"⠿",11],[17,32,"⠿",11],[18,32,"⠿",1],[19,32,"⠿",1],[20,32,"⣿",1],[21,32,"⣿",1],[22,32,"⣿",1],[23,32,"⡿",1],[24,32,"⠿",1],[25,32,"⠿",1],[26,32,"⠿",7],[27,32,"⠿",13],[28,32,"⠿",13],[29,32,"⠿",13],[30,32,"⠿",13],[31,32,"⠿",14],[32,32,"⠿",14],[33,32,"⠿",14],[34,32,"⠿",14],[35,32,"⠿",14],[36,32,"⠿",14],[37,32,"⠿",14],[38,32,"⠿",14],[39,32,"⠿",14],[40,32,"⠿",14],[41,32,"⠿",14],[42,32,"⠿",14],[43,32,"⠃",0],[19,33,"⠘",0],[20,33,"⠻",1],[21,33,"⠿",1],[22,33,"⠿",1],[23,33,"⠃",0],[20,34,"⠈",0],[21,34,"⠉",0],[22,34,"⠁",0],[25,34,"⢀",0],[26,34,"⣠",13],[27,34,"⣄",13],[28,34,"⡀",0],[25,35,"⠘",0],[26,35,"⠿",13],[27,35,"⠿",13],[28,35,"⠃",0]]}];

const CANVAS_WIDTH = 864;
const CANVAS_HEIGHT = 1440;
const CELL_WIDTH = 10.8;
const CELL_HEIGHT = 18;
const FONT_SIZE = 18;
const FONT_FAMILY = "\"SF Mono\", \"Monaco\", \"Cascadia Code\", \"Consolas\", \"JetBrains Mono\", \"Fira Code\", \"Monaspace Neon\", \"Geist Mono\", \"Courier New\", monospace";
const BACKGROUND_COLOR = "#000000";

const RcLogo = (props: AsciiMotionComponentProps = {}) => {
  const { showControls = true, autoPlay = true, onReady } = props;
  const controlsVisible = showControls !== false;
  const initialAutoPlay = autoPlay !== false;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const frameIndexRef = useRef<number>(0);
  const frameElapsedRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const restartRef = useRef<() => void>(() => {});
  const isPlayingRef = useRef<boolean>(initialAutoPlay);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialAutoPlay);
  const [activeFrame, setActiveFrame] = useState<number>(0);
  const updatePlayingState = useCallback((value: boolean) => {
    isPlayingRef.current = value;
    setIsPlaying(value);
  }, []);
  const play = useCallback(() => {
    updatePlayingState(true);
  }, [updatePlayingState]);
  const pause = useCallback(() => {
    updatePlayingState(false);
  }, [updatePlayingState]);
  const togglePlay = useCallback(() => {
    updatePlayingState(!isPlayingRef.current);
  }, [updatePlayingState]);
  const restart = useCallback(() => {
    if (restartRef.current) {
      restartRef.current();
    }
  }, []);

  useEffect(() => {
    if (isPlayingRef.current !== initialAutoPlay) {
      updatePlayingState(initialAutoPlay);
    }
  }, [initialAutoPlay, updatePlayingState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;
    canvas.style.width = CANVAS_WIDTH + 'px';
    canvas.style.height = CANVAS_HEIGHT + 'px';
    context.resetTransform();
    context.scale(devicePixelRatio, devicePixelRatio);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = FONT_SIZE + 'px ' + FONT_FAMILY;
    context.imageSmoothingEnabled = false;

    frameIndexRef.current = 0;
    frameElapsedRef.current = 0;
    lastTimestampRef.current = 0;

    const drawFrame = (index: number) => {
      const frame = FRAMES[index];

      if (BACKGROUND_COLOR) {
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      if (!frame) {
        return;
      }

      for (const cell of frame.cells) {
        const x = cell[0];
        const y = cell[1];
        const char = cell[2];
        const color = COLORS[cell[3]];
        const bgColor = cell.length > 4 ? COLORS[cell[4]] : null;

        if (bgColor) {
          context.fillStyle = bgColor;
          context.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
        }

        context.fillStyle = color || '#ffffff';
        context.fillText(
          char,
          x * CELL_WIDTH + CELL_WIDTH / 2,
          y * CELL_HEIGHT + CELL_HEIGHT / 2
        );
      }

      setActiveFrame(index);
    };

    drawFrame(frameIndexRef.current);

    if (FRAMES.length === 0) {
      restartRef.current = () => {
        drawFrame(0);
        setActiveFrame(0);
      };
      return;
    }

    const step = (timestamp: number) => {
      if (FRAMES.length === 0) {
        return;
      }

      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (isPlayingRef.current) {
        frameElapsedRef.current += delta;

        let nextIndex = frameIndexRef.current;
        let remaining = frameElapsedRef.current;
        let duration = FRAMES[nextIndex]?.duration ?? 16;

        while (remaining >= duration && FRAMES.length > 0) {
          remaining -= duration;
          nextIndex = (nextIndex + 1) % FRAMES.length;
          duration = FRAMES[nextIndex]?.duration ?? duration;
        }

        frameElapsedRef.current = remaining;

        if (nextIndex !== frameIndexRef.current) {
          frameIndexRef.current = nextIndex;
          drawFrame(nextIndex);
        } else {
          drawFrame(frameIndexRef.current);
        }
      } else {
        drawFrame(frameIndexRef.current);
      }

      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);

    restartRef.current = () => {
      frameIndexRef.current = 0;
      frameElapsedRef.current = 0;
      lastTimestampRef.current = 0;
      drawFrame(0);
      setActiveFrame(0);
    };

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof onReady === "function") {
      onReady({
        play,
        pause,
        togglePlay,
        restart,
      });
    }
  }, [onReady, play, pause, togglePlay, restart]);

  const hasFrames = FRAMES.length > 0;

  const handleTogglePlay = () => {
    if (!hasFrames) {
      return;
    }
    togglePlay();
  };

  const handleRestart = () => {
    if (!hasFrames) {
      return;
    }
    restart();
    updatePlayingState(true);
  };

  const playLabel = isPlaying ? 'Pause' : 'Play';
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          width: CANVAS_WIDTH + 'px',
          height: CANVAS_HEIGHT + 'px',
          backgroundColor: BACKGROUND_COLOR || 'transparent',
          imageRendering: 'pixelated'
        }}
      />
      {controlsVisible && (
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={!hasFrames}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              background: isPlaying ? '#f1f5f9' : '#111827',
              color: isPlaying ? '#111827' : '#f9fafb',
              cursor: hasFrames ? 'pointer' : 'not-allowed'
            }}
          >
            {playLabel}
          </button>
          <button
            type="button"
            onClick={handleRestart}
            disabled={!hasFrames}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              background: '#0f172a',
              color: '#f9fafb',
              cursor: hasFrames ? 'pointer' : 'not-allowed'
            }}
          >
            Restart
          </button>
          <span
            style={{ fontFamily: 'monospace', fontSize: '12px', color: '#475569' }}
          >
            {hasFrames ? 'Frame ' + (activeFrame + 1) + ' / ' + FRAMES.length : 'No frames'}
          </span>
        </div>
      )}
    </div>
  );
};

export default RcLogo;
