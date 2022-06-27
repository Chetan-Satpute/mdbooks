import React, { FC, useState } from "react";
import getPageTitles from "../../api/getPageTitles";
import useFetch from "../../hooks/useFetch";
import Modal from "../Modal";

interface IProps {
  loadArticle: (name: string) => Promise<void>;
}

const NavBar: FC<IProps> = ({ loadArticle }) => {
  const [data, Loading] = useFetch(getPageTitles);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-between text-white p-2">
      <h1 className="font-bold text-xl">MD Books</h1>

      <button
        className="flex justify-between items-center border-2 border-cyan-200 rounded-lg p-1 px-2 w-1/2 md:w-2/6"
        onClick={() => setShowModal(true)}
      >
        Select Article
        <span className="material-symbols-outlined">expand_more</span>
      </button>

      {showModal && (
        <Loading spinner={<></>}>
          <Modal data={data} loadArticle={async (name) => {
            setShowModal(false);
            await loadArticle(name);
          }} />
        </Loading>
      )}
    </div>
  );
};


export default NavBar;
