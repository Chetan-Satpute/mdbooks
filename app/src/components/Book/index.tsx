import React, { FC } from "react";
import useFetch from "../../hooks/useFetch";
import getPageContent from "../../api/getPageContent";
import Button from "../Button";
import Page from "../Page";

import "github-markdown-css/github-markdown-dark.css";
import "./index.css";

const Book: FC = () => {
  const [source, Loading] = useFetch(getPageContent);

  return (
    <div className="overflow-auto h-screen no-scrollbar">
      <div className="max-w-[1000px] m-auto markdown-body p-3 ">
        <div className="border-b border-b-neutral-200">
          <button className="material-symbols-rounded font-bold text-4xl">
            navigate_before
          </button>
          <span className="text-xl font-bold float-right">
            Hello World!
          </span>
        </div>
        <Loading>
          <Page source={source} />

          <div className="flex justify-center space-x-5 pt-10 pb-5">
          <button className="bg-green-500 hover:bg-green-700 font-bold text-white p-3 rounded-md w-1/2">Alright!</button>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default Book;
