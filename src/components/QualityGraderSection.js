import React from "react";
import "./styles/QualityGraderSection.css";

function QualityGraderSection() {
  return (
    <section className="quality-grader-section">
      <div className="container2"><div className="title-container">
      <h2>How can <span>Quality Grader</span> help?</h2>
    </div></div>
  <div class="container">
    
    <div className="quality-cards">
      <div className="card"><img
            src="https://cdn.cutshort.io/public/images/next-unauth-assets/quality-grader/quality-grader-feature-1.svg"
            alt="Filter Slider"
          />
        <h3>Find top quality profiles quickly</h3>
        <p>
          Quality Grader has analyzed millions of resumes and understands the list of top companies or colleges that indicate higher talent quality.
        </p>
      </div>
      <div className="card2"><img
            src="https://cdn.cutshort.io/public/images/next-unauth-assets/quality-grader/quality-grader-feature-2.svg"
            alt="Quality Grader 2"
          />
        <h3>Go beyond IITs</h3>
        <p>
          Find candidates who didn’t go to top colleges or companies but have strong indicators of quality
          on their profile.
        </p>
      </div>
    </div>
  </div>
</section>

  );
}

export default QualityGraderSection;
