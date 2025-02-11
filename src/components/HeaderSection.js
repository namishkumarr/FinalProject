import React from "react";
import Button from "./Button";
import "./styles/HeaderSection.css";

function HeaderSection({ onTryNowClick }) {
  return (
    <header className="header-section">
      <div className="container"><div className="text-container">
      <h1>Your <span className="ai">A-Eye</span> for great talent</h1>
      <p>
        Frustrated with low-quality resumes?</p>
        <p>Quality Grader is an AI model that can go over millions of <div>resumes to find the winners you can take bets on.</div>
      </p><div className="block"></div>
      <Button text="Try it out now" primary onClick={onTryNowClick}/></div><div className="img-container"><img
            src="https://cdn.cutshort.io/public/images/next-unauth-assets/quality-grader/quality-grader-hero.svg"
            alt="Quality Grader Hero"
          /></div></div>
    </header>
  );
}

export default HeaderSection;
