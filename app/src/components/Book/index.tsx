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
    <div className="overflow-auto max-w-[1000px] h-screen m-auto markdown-body p-3 no-scrollbar">
      <Loading>
        <Page source={source} />

        <div className="flex justify-center space-x-5 pt-10 pb-5">
          <Button onClick={() => {}}>
            <span className="material-symbols-rounded font-bold">
              navigate_before
            </span>
            Prev
          </Button>
          <Button onClick={() => {}}>
            Next
            <span className="material-symbols-rounded font-bold">
              navigate_next
            </span>
          </Button>
        </div>
      </Loading>
    </div>
  );
}

export default Book;
