import React from "react";

const Button = ({ text }) => (
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    {text}
  </button>
);

export default Button;
