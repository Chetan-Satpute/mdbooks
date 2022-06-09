import React, { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import Canvas from "../Canvas";
import useFetch from "../../hooks/useFetch";
import getPageContent from "../../api/getPageContent";

import "github-markdown-css/github-markdown-dark.css";
import "./index.css";

let components = { Canvas };

const Page: FC<{}> = () => {
  const [source, Loading] = useFetch(getPageContent);

  return (
    <div className="overflow-auto max-w-[1000px] h-screen m-auto markdown-body p-3 no-scrollbar">
      <Loading>
        <MDXRemote {...source} components={components} />
      </Loading>
    </div>
  );
};

export default Page;
