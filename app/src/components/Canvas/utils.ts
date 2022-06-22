// https://codepen.io/chengarda/pen/wRxoyB

import { MouseEvent, TouchEvent } from "react";

export type Pair = { x: number; y: number };

export const setupContext = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = "#c9d1d9";
  ctx.lineWidth = 2;
};

export function getPosition(
  e: TouchEvent<HTMLCanvasElement> | MouseEvent<HTMLCanvasElement>
) {
  if (e.type === "touchstart" || e.type === "touchmove") {
    e = e as TouchEvent<HTMLCanvasElement>;

    if (e.touches.length === 1) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else {
      return [
        {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        },
        {
          x: e.touches[1].clientX,
          y: e.touches[1].clientY,
        },
      ];
    }
  }

  if (e.type === "mousedown" || e.type === "mousemove") {
    e = e as MouseEvent<HTMLCanvasElement>;

    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
}

export const getPinchDist = (e: TouchEvent<HTMLCanvasElement>) => {
  const deltaX = e.touches[1].clientX - e.touches[0].clientX;
  const deltaY = e.touches[1].clientY - e.touches[0].clientY;

  const dist = deltaX ** 2 + deltaY ** 2;

  return dist;
};
