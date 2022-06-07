import React, { FC, useEffect, useState } from "react";

type getDataFunction = (...args: any[]) => Promise<any>;

interface ILoadingProps {
  spinner?: React.FC;
  children: React.ReactNode;
}

const useFetch = (getData: getDataFunction) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const data = await getData();

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === true) {
      fetchData();
    }
  }, [loading]);

  const Loading: FC<ILoadingProps> = ({ spinner, children }) => {
    if (loading) {
      return spinner ? <>{spinner}</> : <span>Loading...</span>;
    }

    return <>{children}</>;
  };

  return [data, Loading];
};

export default useFetch;
