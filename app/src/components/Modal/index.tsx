import React, { FC } from "react";

interface IProps {
  data: {
    title: string;
    bookID: string;
  }[];

  loadArticle: (name: string) => Promise<void>;
}

const Modal: FC<IProps> = ({ data, loadArticle }) => {
  return (
    <div className="absolute top-0 left-0 bg-black/80 h-screen w-screen z-10 p-3">
      <div className="bg-[#1e1e1e] border-2 border-cyan-400 max-w-[700px] mt-16 m-auto py-5 px-3 rounded-lg shadow-lg space-y-2 h-5/6 overflow-auto no-scrollbar text-center">
        <span className="font-bold">Select Article</span>
        {data.map(({ title, bookID }) => (
          <button
            key={bookID}
            onClick={() => loadArticle(bookID)}
            className="w-full p-2 bg-violet-700 hover:bg-violet-900 rounded-lg"
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Modal;

