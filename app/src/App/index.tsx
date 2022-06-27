import React, { FC } from "react";
import getBook, { Book } from "../api/getBook";
import NavBar from "../components/NavBar";
import Playground from "../components/Playground";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

const App: FC = () => {
  const [data, Loading, trigger] = useFetch<Book>(getBook, "getting-started");
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar loadArticle={trigger} />
      <Loading spinner={<Spinner />}>
        <Playground data={data} />
      </Loading>
    </div>
  );
};

export default App;
