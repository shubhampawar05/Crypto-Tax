import React from "react";

const LabelInput = ({ title, setValue }) => (
  <div className=" relative ">
    <h1 className="mb-1">{title}</h1>
    <input
      type="text"
      className="w-full bg-[#eff2f5] px-6 py-3 rounded-md font-semibold text-xl"
      onChange={(e) => setValue(e.target.value)}
    />
    <span className=" absolute px-6 py-3 -left-3 text-xl  font-semibold">{`$`}</span>
  </div>
);

export default LabelInput;
