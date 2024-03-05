import React from "react";

const Button = ({ txt, onclick }) => {
  return (
    <button
      className="rounded bg-red-500 px-3 py-1 text-black transition-all duration-100 hover:bg-orange-700"
      onClick={onclick}
    >
      {txt}
    </button>
  );
};

export default Button;
