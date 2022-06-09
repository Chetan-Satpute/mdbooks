import React, { FC, useEffect, useRef, useState } from "react";

import "./index.css";

type DrawFunction = (cxt: CanvasRenderingContext2D) => Promise<void>;

interface IProps {
  height: number;
  width: number;
  draw: DrawFunction;
}

const Canvas: FC<IProps> = ({ draw, height, width }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const render = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // wait for next animation frame
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#c9d1d9";

    await draw(ctx);
  };

  const handleResize: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const value = Number(event.target.value);

    canvas.height = height * value;
    canvas.width = width * value;

    ctx.scale(value, value);

    await render();
  };

  useEffect(() => {
    render();
  }, [draw]);

  return (
    <div className="text-center">
      <div className="canvas-container h-[400px]">
        <canvas ref={canvasRef} height={height} width={width} />
      </div>
      <input
        type="range"
        className="w-full md:w-1/2"
        min={0.5}
        max={2}
        step={0.01}
        onChange={handleResize}
      />
    </div>
  );
};

export default Canvas;
