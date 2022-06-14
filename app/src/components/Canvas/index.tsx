import React from "react";
import {
  getPinchDist,
  getPosition,
  Pair,
  prepareCanvas,
  setupContext,
} from "./utils";

interface IProps {
  draw: (ctx: CanvasRenderingContext2D) => FrameRequestCallback;
}

interface IState {
  scale: Pair;
  translate: Pair;
}

class Canvas extends React.Component<IProps, IState> {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;

  animationFrameID: number;

  scale: Pair;
  translate: Pair;

  dragStart: Pair;
  prevPinchDistance: number;
  prevTranslate: Pair;

  constructor(props: IProps) {
    super(props);

    this.containerRef = React.createRef<HTMLDivElement>();
    this.canvasRef = React.createRef<HTMLCanvasElement>();

    this.scale = { x: 1, y: 1 };
    this.translate = { x: 0, y: 0 };
    this.dragStart = undefined;
    this.prevTranslate = { x: 0, y: 0 };
    this.prevPinchDistance = 0;
  }

  componentDidMount(): void {
    const canvas = this.canvasRef.current;
    const container = this.containerRef.current;

    const ctx = canvas.getContext("2d");

    prepareCanvas(canvas, container);
    setupContext(ctx);

    const step = this.props.draw(ctx);

    const render: FrameRequestCallback = (timestamp) => {
      // transform context
      ctx.setTransform(
        this.scale.x,
        0,
        0,
        this.scale.y,
        this.translate.x,
        this.translate.y
      );

      // Clear canvas before drawing next frame
      ctx.clearRect(-1000, -1000, canvas.width + 10000, canvas.height + 10000);

      step(timestamp);
      this.animationFrameID = window.requestAnimationFrame(render);
    };

    this.animationFrameID = window.requestAnimationFrame(render);
  }

  componentWillUnmount(): void {
    window.cancelAnimationFrame(this.animationFrameID);
  }

  translateCanvas = (x: number, y: number) => {
    if (this.dragStart !== undefined) {
      this.translate = {
        x: this.prevTranslate.x + (x - this.dragStart.x),
        y: this.prevTranslate.y + (y - this.dragStart.y),
      };
    }
  };

  scaleCanvas = (x: number, y: number, up: boolean) => {
    const delta = 0.01 * (up ? 1 : -1);

    this.scale = {
      x: this.scale.x + delta,
      y: this.scale.y + delta,
    };
  };

  //////////////////// Event Handlers ////////////////////

  handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    this.dragStart = getPosition(e) as Pair;
  };
  
  handleTouchStart: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    if (e.touches.length === 1) {
      this.dragStart = getPosition(e) as Pair;
    } else {
      this.prevPinchDistance = getPinchDist(e);
    }
  };

  handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const { x, y } = getPosition(e) as Pair;
    this.translateCanvas(x, y);
  };

  handleTouchMove: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const { x, y } = getPosition(e) as Pair;
    if (e.touches.length === 1) {
      this.translateCanvas(x, y);
    } else {
      const pinchDistance = getPinchDist(e);
      this.scaleCanvas(x, y, pinchDistance > this.prevPinchDistance);
      this.prevPinchDistance = pinchDistance;
    }
  };

  handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    this.dragStart = undefined;
    this.prevTranslate = this.translate;
  };

  handleTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    this.dragStart = undefined;
    this.prevTranslate = this.translate;
  };

  handleWheel: React.WheelEventHandler<HTMLCanvasElement> = (e) => {
    this.scaleCanvas(e.clientX, e.clientY, e.deltaY > 0);
  };

  handleDoubleClick: React.MouseEventHandler<HTMLCanvasElement> = () => {
    this.scale = {x: 1, y: 1};
    this.translate = { x: 0, y: 0 };
  };

  ////////////////////////////////////////////////////////////

  render(): React.ReactNode {
    return (
      <div ref={this.containerRef} className="h-96">
        <canvas
          ref={this.canvasRef}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          onMouseMove={this.handleMouseMove}
          onTouchMove={this.handleTouchMove}
          onMouseUp={this.handleMouseUp}
          onTouchEnd={this.handleTouchEnd}
          onWheel={this.handleWheel}
          onDoubleClick={this.handleDoubleClick}
        />
      </div>
    );
  }
}

export default Canvas;
