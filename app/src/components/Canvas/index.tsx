import React from "react";

interface IProps {
  draw: (ctx: CanvasRenderingContext2D) => FrameRequestCallback;
  width: number;
  height: number;
}

interface IState {
  active: boolean;
}

class Canvas extends React.Component<IProps, IState> {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;

  animationFrameID: number;

  dragStart: { x: number; y: number };

  scale: { x: number; y: number };

  translate: {
    curr: { x: number; y: number };
    prev: { x: number; y: number };
  };

  pinchZoomDist: number;

  static SCALE_SENSITIVITY = 0.01;

  constructor(props: IProps) {
    super(props);

    this.containerRef = React.createRef<HTMLDivElement>();
    this.canvasRef = React.createRef<HTMLCanvasElement>();

    this.state = {
      active: false,
    };

    this.scale = {
      x: 1,
      y: 1,
    };

    this.translate = {
      curr: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
    };

    this.pinchZoomDist = 0;

    if (this.props.height === undefined) {
      throw new Error("<Canvas /> requires a height attribute !" + sampleCanvasCode);
    }

    if (this.props.width === undefined) {
      throw new Error("<Canvas /> requires a width attribute !" + sampleCanvasCode);
    }

    if (this.props.draw === undefined) {
      throw new Error("<Canvas /> requires a draw function as attribute !" + sampleCanvasCode);
    }

  }

  componentDidMount(): void {
    this.setupCanvas();

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const step = this.props.draw(ctx);

    const render: FrameRequestCallback = (timestamp) => {
      this.setupCanvasContext();

      step(timestamp);

      this.animationFrameID = window.requestAnimationFrame(render);
    };

    this.animationFrameID = window.requestAnimationFrame(render);

    ////////// Event Handlers //////////
    canvas.addEventListener("wheel", this.handleWheel, { passive: false });
    canvas.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });
  }

  componentWillUnmount(): void {
    window.cancelAnimationFrame(this.animationFrameID);

    const canvas = this.canvasRef.current;

    ////////// Event Handlers //////////
    canvas.removeEventListener("wheel", this.handleWheel);
    canvas.removeEventListener("touchmove", this.handleTouchMove);
  }

  setupCanvas = () => {
    const canvas = this.canvasRef.current;
    const container = this.containerRef.current;
    const ctx = canvas.getContext("2d");

    // TODO: HERE 4 is border (find a better implementation
    canvas.height = container.clientHeight - 4;
    canvas.width = container.clientWidth - 4;

    this.translate = {
      curr: {
        x: Math.max(0, (canvas.width - this.props.width) / 2),
        y: Math.max(0, (canvas.height - this.props.height) / 2),
      },
      prev: {
        x: Math.max(0, (canvas.width - this.props.width) / 2),
        y: Math.max(0, (canvas.height - this.props.height) / 2),
      },
    };

    // Default styles
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
  };

  setupCanvasContext = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.setTransform(
      this.scale.x,
      0,
      0,
      this.scale.y,
      this.translate.curr.x,
      this.translate.curr.y
    );

    ctx.clearRect(-1000, -1000, canvas.width + 10000, canvas.height + 10000);
  };

  //////////////////// Event Handlers ////////////////////

  handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    this.dragStart = { x: e.clientX, y: e.clientY };
  };

  handleTouchStart: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    if (e.touches.length === 1) {
      this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }

    if (e.touches.length === 2) {
      let XDiff = e.touches[1].clientX - e.touches[0].clientX;
      let YDiff = e.touches[1].clientY - e.touches[0].clientY;

      this.pinchZoomDist = XDiff * XDiff + YDiff * YDiff;
    }
  };

  handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (this.dragStart !== undefined) {
      this.translate.curr = {
        x: this.translate.prev.x + (e.clientX - this.dragStart.x),
        y: this.translate.prev.y + (e.clientY - this.dragStart.y),
      };
    }
  };

  handleTouchMove: (e: TouchEvent) => any = (e) => {
    if (this.state.active) {
      e.preventDefault();

      if (e.touches.length === 1) {
        if (this.dragStart !== undefined) {
          this.translate.curr = {
            x:
              this.translate.prev.x + (e.touches[0].clientX - this.dragStart.x),
            y:
              this.translate.prev.y + (e.touches[0].clientY - this.dragStart.y),
          };
        }
      }

      if (e.touches.length === 2) {
        let XDiff = e.touches[1].clientX - e.touches[0].clientX;
        let YDiff = e.touches[1].clientY - e.touches[0].clientY;

        const pinchDistance = XDiff * XDiff + YDiff * YDiff;
        let zoomUP = pinchDistance < this.pinchZoomDist;

        const delta = Canvas.SCALE_SENSITIVITY * (zoomUP ? -1 : 1);

        const xDist =
          (e.touches[0].clientX + e.touches[1].clientX) / 2 -
          this.canvasRef.current.getBoundingClientRect().x -
          this.translate.curr.x;
        const yDist =
          (e.touches[0].clientY + e.touches[1].clientY) / 2 -
          this.canvasRef.current.getBoundingClientRect().y -
          this.translate.curr.y;

        this.translate.curr.x -=
          (this.scale.x + delta) * (xDist / this.scale.x) - xDist;
        this.translate.curr.y -=
          (this.scale.y + delta) * (yDist / this.scale.y) - yDist;

        this.translate.prev = { ...this.translate.curr };

        this.scale = {
          x: this.scale.x + delta,
          y: this.scale.y + delta,
        };

        this.pinchZoomDist = pinchDistance;
      }
    }
  };

  handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
    this.dragStart = undefined;
    this.translate.prev = { ...this.translate.curr };
  };

  handleTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = () => {
    this.dragStart = undefined;
    this.translate.prev = { ...this.translate.curr };
  };

  handleWheel: (ev: WheelEvent) => any = (e) => {
    if (this.state.active) {
      // dont scroll page
      e.preventDefault();

      const delta = Canvas.SCALE_SENSITIVITY * (e.deltaY > 0 ? -1 : 1);

      const xDist =
        e.clientX -
        this.canvasRef.current.getBoundingClientRect().x -
        this.translate.curr.x;
      const yDist =
        e.clientY -
        this.canvasRef.current.getBoundingClientRect().y -
        this.translate.curr.y;

      this.translate.curr.x -=
        (this.scale.x + delta) * (xDist / this.scale.x) - xDist;
      this.translate.curr.y -=
        (this.scale.y + delta) * (yDist / this.scale.y) - yDist;

      this.translate.prev = { ...this.translate.curr };

      this.scale = {
        x: this.scale.x + delta,
        y: this.scale.y + delta,
      };
    }
  };

  handleDoubleClick: React.MouseEventHandler<HTMLCanvasElement> = () => {
    this.scale = { x: 1, y: 1 };
    this.translate.curr = { x: 0, y: 0 };
    this.translate.prev = { x: 0, y: 0 };
    this.dragStart = undefined;

    this.setState({ active: !this.state.active }, () => {
      this.setupCanvas();
    });
  };

  ////////////////////////////////////////////////////////////

  render(): React.ReactNode {
    return (
      <div
        ref={this.containerRef}
        className={`${this.state.active ? "border-2" : ""} rounded-lg`}
        style={{ height: `${Math.max(224, this.props.height)}px` }}
      >
        {this.state.active ? (
          <canvas
            ref={this.canvasRef}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onDoubleClick={this.handleDoubleClick}
          />
        ) : (
          <canvas ref={this.canvasRef} onDoubleClick={this.handleDoubleClick} />
        )}
      </div>
    );
  }
}

export default Canvas;

const sampleCanvasCode = `

Sample <Canvas /> code:

<Canvas
    height={200}
    width={200}
    draw={(ctx) => {
    
        return () => {
            ctx.beginPath();

            ctx.moveTo(50, 100);
            ctx.arc(100, 100, 50, 0, Math.PI * 2);
            
            ctx.closePath();

            ctx.stroke();

            ctx.beginPath();
            
            ctx.arc(100, 100, 100, 0, Math.PI * 2);
            
            ctx.closePath();

            ctx.stroke();
        }
        
    }} 
/>

`;
