// https://codepen.io/chengarda/pen/wRxoyB

import React, { TouchEvent } from "react";

export const getPinchDist = (e: TouchEvent<HTMLCanvasElement>) => {
  const deltaX = e.touches[1].clientX - e.touches[0].clientX;
  const deltaY = e.touches[1].clientY - e.touches[0].clientY;

  const dist = deltaX ** 2 + deltaY ** 2;

  return dist;
}

