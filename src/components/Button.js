import React from "react";
import "./styles/Button.css";

function Button({ text, primary, onClick }) {
  return (
    <button
      className={`button ${primary ? "btn-primary" : "btn-secondary"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
