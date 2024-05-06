import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div
      style={{ color: "white" }}
      className="flex flex-col items-center w-[150px]"
    >
      <p>{title}</p>
      <h4>{value}</h4>
    </div>
  );
};

export default CountBox;
