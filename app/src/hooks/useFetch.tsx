import React, { FC, useEffect, useState } from "react";

export type getDataFunction = (...args: any[]) => Promise<any>;

interface ILoadingProps {
  spinner?: React.ReactNode;
  children: React.ReactNode;
}

const useFetch = <T,>(
  getData: getDataFunction,
  ...args: any[]
): [T, FC<ILoadingProps>, (...params: any[]) => Promise<void>] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  const fetchData = async (...params: any[]) => {
    setLoading(true);

    const data = await getData(...params);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === true) {
      fetchData(...args);
    }
  }, []);

  const Loading: FC<ILoadingProps> = ({ spinner, children }) => {
    if (loading) {
      return spinner ? <>{spinner}</> : <span>Loading...</span>;
    }

    return <>{children}</>;
  };

  return [data, Loading, fetchData];
};

export default useFetch;
