import React, { FC, useRef, useLayoutEffect, useState } from "react";
import { getPinchDist } from "./utils";

export type DrawFunction = (cxt: CanvasRenderingContext2D) => void;
export type Pair = { x: number; y: number };

interface IProps {
  draw: DrawFunction;
}

const Canvas: FC<IProps> = ({ draw }) => {
  const containerRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  const [scale, setScale] = useState<Pair>({ x: 1, y: 1 });
  const [pinchDist, setPinchDist] = useState<number>(0);

  const [dragStart, setDragStart] = useState<Pair>();
  const [translate, setTranslate] = useState<[Pair, Pair]>([
    { x: 0, y: 0 }, // current
    { x: 0, y: 0 }, // previous
  ]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    canvas.height = containerRect.height;
    canvas.width = containerRect.width;
  }, []);

  const render = async () => {
    // wait for next animation frame
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setup Canvas
    ctx.setTransform(scale.x, 0, 0, scale.y, translate[0].x, translate[0].y);
    ctx.clearRect(-1000, -1000, canvas.width + 1000, canvas.height + 1000);

    // default styles
    ctx.strokeStyle = "#c9d1d9";
    ctx.lineWidth = 2;

    // Draw
    draw(ctx);
  };

  useLayoutEffect(() => {
    render();
  }, [translate, scale]);

  const onMove = (x: number, y: number) => {
    if (dragStart !== undefined) {
      setTranslate([
        {
          x: translate[1].x + (x - dragStart.x),
          y: translate[1].y + (y - dragStart.y),
        },
        translate[1],
      ]);
    }
  };

  const onUp = () => {
    setDragStart(undefined);
    setTranslate([translate[0], translate[0]]);
  };

  const onZoom = (zoomIn: boolean) => {
    const { x, y } = scale;

    const delta = 0.01 * (zoomIn ? 1 : -1);

    setScale({ x: x + delta, y: y + delta });
  };

  return (
    <div ref={containerRef} className="w-full h-96">
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => setDragStart({ x: e.clientX, y: e.clientY })}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          } else {
            setPinchDist(getPinchDist(e));
          }
        }}
        onMouseMove={(e) => onMove(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          if (e.touches.length === 1) {
            onMove(e.touches[0].clientX, e.touches[0].clientY);
          } else {
            const dist = getPinchDist(e);
            onZoom(dist > pinchDist);
            setPinchDist(dist);
          }
        }}
        onMouseUp={onUp}
        onTouchEnd={onUp}
        onWheel={(e) => onZoom(e.deltaY > 0)}
      />
    </div>
  );
};

export default Canvas;
