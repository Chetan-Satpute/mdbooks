import Editor from "@monaco-editor/react";
import React, { FC, useEffect, useState } from "react";
import getJSX from "../../api/getJSX";
import useFetch from "../../hooks/useFetch";
import Page from "../Page";
import Spinner from "../Spinner";

interface IProps {
  data: {
    title: string;
    bookID: string;
    pages: string;
  }
}

const Playground: FC<IProps> = ({ data: { pages } }) => {
  const [mdx, setMDX] = useState(pages);
  const [data, Loading, trigger] = useFetch(getJSX, pages);
  const [timeoutID, setTimeoutID] = useState<any>();

  const handleChange = (value: string) => {
    setMDX(value);

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    setTimeoutID(setTimeout(() => trigger(value), 500));
  };

  useEffect(() => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    setTimeoutID(setTimeout(() => trigger(mdx), 500));
  }, [mdx]);

  return (
    <div className="flex-auto flex flex-col md:flex-row min-h-0">
      <div className={`w-full md:w-3/5 h-3/5 md:h-auto overflow-auto no-scrollbar p-3`}>
        <Loading spinner={<Spinner />}>
          <Page data={data} />
        </Loading>
      </div>
        <div className="md:w-2/5 m-3 h-2/5 md:h-auto py-5 rounded-xl border-2 border-cyan-400 bg-[#1e1e1e]">
          <Editor
            theme="vs-dark"
            value={mdx}
            defaultValue={pages}
            defaultLanguage="markdown"
            loading={<Spinner />}
            onChange={handleChange}
          />
        </div>
    </div>
  );
};

export default Playground;
