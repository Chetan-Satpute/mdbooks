import React, { FC, useState } from "react";

const Playground: FC = () => {
  const [mdx, setMDX] = useState(defaultMDX);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-auto flex p-3">
        <div className="flex-auto w-3/5 p-3">
        </div>
        <div className="bg-[#1e1e1e] w-2/5 rounded-xl py-5 border-2 border-cyan-400">
        </div>
      </div>
    </div>
  );
};

export default Playground;

const defaultMDX = `

# Hello World !

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
`
