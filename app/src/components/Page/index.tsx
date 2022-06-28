import React, { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import Canvas from "../Canvas";
import ErrorBoundary from "../ErrorBoundry";

import "github-markdown-css/github-markdown-dark.css";
import "prism-theme-night-owl";
import "./index.css";

let components = { Canvas };

const Page: FC<{ data: any }> = ({ data }) => {
  if (data.error) {
    return (
      <div>
        <pre className="text-red-400">{data.error}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="markdown-body">
        <MDXRemote {...data.source} components={components} />
      </div>
    </ErrorBoundary>
  );
};

export default Page;
