import React, { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import Canvas from "../Canvas";

let components = { Canvas };

const Page: FC<{ source: any }> = ({ source }) => {
  return <MDXRemote {...source} components={components} />;
};

export default Page;
