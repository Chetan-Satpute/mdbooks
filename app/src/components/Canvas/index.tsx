import React, { FC, useEffect, useRef } from "react";

import "./index.css";

interface IProps {
  draw: (
    canvas: HTMLCanvasElement,
    cxt: CanvasRenderingContext2D
  ) => Promise<void>;
}

const Canvas: FC<IProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    draw(canvas, ctx);
  }, [draw]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
