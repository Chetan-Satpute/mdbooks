import React, { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import Canvas from "../Canvas";

import "github-markdown-css/github-markdown-dark.css";

let components = { Canvas };

const Page: FC<{ source: any }> = ({ source }) => {
  return <div className="markdown-body"><MDXRemote {...source} components={components} /></div>;
};

export default Page;
