import React from "react";
import { ImCross } from "react-icons/im";

const clearInput = () => {
  document.getElementById("input").value = "";
};

export const Form = ({ setSearch }) => {
  return (
    <div className="form">
      <input
        type="text"
        id="input"
        placeholder="enter city"
        className="city-input"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button>
        <ImCross onClick={() => clearInput()} />
      </button>
    </div>
  );
};
