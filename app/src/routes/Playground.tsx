import React, { FC, useState } from "react";

import Editor from "@monaco-editor/react";
import Page from "../components/Page";
import useFetch from "../hooks/useFetch";
import getJSX from "../api/getJSX";

const Playground: FC = () => {
  const [mdx, setMDX] = useState(defaultMDX);
  const [data, Loading, trigger] = useFetch(getJSX, mdx);
  const [timeoutID, setTimeoutID] = useState<any>();

  const handleChange = (value: string) => {
    setMDX(value);

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    setTimeoutID(setTimeout(() => trigger(value), 500));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center">
        <h1 className="font-bold text-xl p-2 text-white">Markdown Books</h1>
      </div>
      <div className="flex-auto flex p-3">
        <div className="flex-auto w-3/5 p-3">
          <Loading spinner={<span className="text-white">spinner...</span>}>
            <Page data={data} />
          </Loading>
        </div>
        <div className="bg-[#1e1e1e] w-2/5 rounded-xl py-5 border-2 border-cyan-400">
          <Editor
            theme="vs-dark"
            defaultLanguage="markdown"
            defaultValue={mdx}
            onChange={handleChange}
          />
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
