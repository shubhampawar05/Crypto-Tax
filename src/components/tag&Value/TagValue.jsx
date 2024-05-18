import React from "react";

const TagValue = ({ title, options }) => (
  <div className="flex gap-2 items-center">
    <label htmlFor="year" className="w-fit inline-block shrink-0">
      {title}
    </label>
    <select className="w-full bg-[#eff2f5] px-2 py-2 rounded-md font-semibold">
      {options.map((option, idx) => (
        <option key={idx}>{option}</option>
      ))}
    </select>
  </div>
);

export default TagValue;
 