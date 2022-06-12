import React, { Children, FC } from "react";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button: FC<IProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-between items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
