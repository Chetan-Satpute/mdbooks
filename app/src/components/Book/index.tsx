import React, { FC } from "react";
import useFetch from "../../hooks/useFetch";
import getPageContent from "../../api/getPageContent";
import Page from "../Page";

const Book: FC = () => {
  const [source, Loading] = useFetch(getPageContent);

  return (
    <div className="overflow-auto h-screen no-scrollbar">
      <div className="max-w-[1000px] m-auto">
        <Loading>
          <Page source={source} />

          <div className="flex items-center flex-col space-y-3 pt-10 pb-5">
            <button className="bg-green-500 hover:bg-green-700 font-bold text-white p-3 rounded-md w-2/3 md:w-1/2">
              Alright!
            </button>
            <button className="bg-neutral-500 hover:bg-neutral-700 font-bold text-white p-3 rounded-md w-2/3 md:w-1/2">
              Go Back
            </button>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default Book;
